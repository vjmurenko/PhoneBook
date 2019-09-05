import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Contact} from "../model/contact.model";
import {ContactService} from "../service/contact.service";
import {NgForm} from "@angular/forms";
import {PhoneService} from "../service/phone.service";
import {ToastrService} from "ngx-toastr";
import {Phone} from "../model/phone.model";

@Component({
    selector: 'app-pop',
    templateUrl: './popup-contact.component.html',
    styleUrls: []
})
export class PopupContactComponent implements OnInit {

    formData: Contact;
    phoneIndex: number;
    editValue:boolean = false;



    constructor(@Inject(MAT_DIALOG_DATA) public data,
                public dialogRef: MatDialogRef<PopupContactComponent>,
                private  contactService: ContactService,
                private  phoneService: PhoneService,
                private toastr: ToastrService
    ) {}


    ngOnInit() {


        if (this.data.contact == null) {
            this.formData = {
                Name: "",
                Id: 0,
                Address: '',
                Phones: []
            };
            this.formData.Phones.push({PhoneNumber: ""});
        }
        else {

            this.formData = Object.assign({}, this.data.contact);
            this.phoneIndex = this.data.phoneId;
            this.editValue = true;
        }

    }

    onSubmit(form: NgForm) {

        if (this.editValue == false) {

            this.contactService.postContact(form.value).subscribe();
        } else {

            this.contactService.putContact(form.value).subscribe();
            this.phoneService.putPhone(this.formData.Id, this.formData.Phones[this.phoneIndex].PhoneNumber, this.formData.Phones[this.phoneIndex].Id).subscribe();
        }

        this.dialogRef.close();

    }

}
