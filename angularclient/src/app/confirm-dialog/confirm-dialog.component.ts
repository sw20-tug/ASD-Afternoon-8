import { Component, OnInit } from '@angular/core';
 import { ConfirmDialogService } from '../service/recipe-service.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  message: any;
  cmessage: any;
  constructor(
      private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
      // this function waits for a message from alert service, it gets
      // triggered when we call this from any other component
      this.confirmDialogService.getMessage().subscribe(message => {
          this.message = message;
      });
  }
}
