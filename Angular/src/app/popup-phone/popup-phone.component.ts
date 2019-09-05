import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {PhoneService} from "../service/phone.service";
import {Phone} from "../model/phone.model";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-popup-phone',
  templateUrl: './popup-phone.component.html',
  styleUrls: []
})
export class PopupPhoneComponent implements OnInit {
formData: Phone;


  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<PopupPhoneComponent>,
              private phoneService: PhoneService,
              private  toastr: ToastrService) { }

  ngOnInit() {
    this.formData = {
      PhoneNumber: "",
      ContactId: this.data.contactID
    }
  }

  onSubmit(form: NgForm) {
    this.phoneService.postPhone(form.value).subscribe();
    this.dialogRef.close();
  }
}
