import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../model/contact.model';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {PopupContactComponent} from "../popup-contact/popup-contact.component";
import {ToastrService} from "ngx-toastr";
import {PopupPhoneComponent} from "../popup-phone/popup-phone.component";


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styles: []
})
export class ContactComponent implements OnInit {

    contactList: Contact[] = null;
    PhoneNumberID: number = 0;


    constructor(private service: ContactService,
                private dialog: MatDialog,
                private  toastr: ToastrService) {
    }

    ngOnInit() {

        this.refreshList();

    }

    refreshList() {
        this.service.getContactList().then(res => this.service.contactList = res as Contact[]);
    }

    addOrEditNewContact(contact: Contact, phoneId: number) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.height = "50%";
        dialogConfig.data = {contact, phoneId};


        this.dialog.open(PopupContactComponent, dialogConfig).afterClosed().subscribe(() =>{
                this.refreshList();
                this.toastr.success("Added successfully")

        }
        );

    }

    deleteContact(contactID: number) {
        this.service.deleteContact(contactID).then(() => {
            this.refreshList();
            this.toastr.warning("Deleted successfully")

        })

    }

    onChangePhoneNumber(event){

     this.PhoneNumberID = event.target.selectedIndex;
    }

    onAddPhoneNumber(contactID: number ){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "20%";
        dialogConfig.height = "20%";
        dialogConfig.data = {contactID};


        this.dialog.open(PopupPhoneComponent, dialogConfig).afterClosed().subscribe(() =>{
            this.refreshList();
            this.toastr.success("Phone added successfully")

        });

    }

}
