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

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private documentService: DocumentService) {}

  onUpload(event: any) {
    console.log(event)
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.documentService.upload(this.uploadedFiles).subscribe(res => {
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: 'Successfully Uploaded!'});
      this.getAll()
    }, error => {
      this.messageService.add({severity: 'error', summary: 'File Uploaded', detail: 'Not upload!'});
    });

  }

  getAll(){
    this.documentService.getAll().subscribe(res => {
      this.files = res;
    })
  }

  ngOnInit(): void {
    this.authService.login({username: 'admin', password: 'password'}).subscribe(res => {
      var d = new LoginResponse();
      sessionStorage.setItem("jwtToken", JSON.parse(res).accessToken)
      this.getAll();
    })
  }
}
