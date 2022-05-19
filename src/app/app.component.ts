import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {AuthService} from "../service/auth.service";
import {DocumentService} from "../service/document.service";
import {HttpHeaders} from "@angular/common/http";
import {DocumentListResponse} from "../model/document";
import {LoginResponse} from "../model/auth";

@Component({
  providers: [MessageService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'File Management';
  uploadedFiles: any[] = [];
  files: any = {}
  showUploadBtn= true;

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private documentService: DocumentService) {}

  onUpload(event: any) {
    this.showUploadBtn = false
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.documentService.upload(this.uploadedFiles).subscribe(res => {
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: 'File uploaded successfully'});
      this.getAll()
    }, error => {
      this.messageService.add({severity: 'error', summary: 'File Uploaded', detail: 'Could not upload file!'});
      this.refresh();
    });

  }

  getAll(){
    this.showUploadBtn = false
    this.documentService.getAll().subscribe(res => {
      this.files = res;
      this.refresh();
    })
  }

  ngOnInit(): void {
    this.authService.login({username: 'admin', password: 'password'}).subscribe(res => {
      sessionStorage.setItem("jwtToken", JSON.parse(res).accessToken)
      this.getAll();
    })
  }

  delete(file: any) {
    this.documentService.delete(file.id).subscribe(res => {
      this.messageService.add({severity: 'info', summary: 'File Deleted', detail: 'File has been deleted successfully'});
      this.getAll();
    })
  }

  onUpdate(event: any, file: any) {
    this.showUploadBtn = false
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.documentService.update(file.id, this.uploadedFiles).subscribe(res => {
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: 'File has been updated successfully'});
      this.getAll()
    }, error => {
      this.messageService.add({severity: 'error', summary: 'File Uploaded', detail: 'Could not update file!'});
      this.refresh()
    });
  }

  refresh(){
    this.uploadedFiles =[]
    this.showUploadBtn = true
  }
}
