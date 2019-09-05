import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../model/contact.model';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {PopupContactComponent} from "../popup-contact/popup-contact.component";
import {ToastrService} from "ngx-toastr";
import {PopupPhoneComponent} from "../popup-phone/popup-phone.component";
import {PhoneService} from "../service/phone.service";


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styles: []
})
export class ContactComponent implements OnInit {

    contactList: Contact[] = null;
    PhoneNumberID: number = 0;


    constructor(private contactService: ContactService,
                private phoneService: PhoneService,
                private dialog: MatDialog,
                private  toastr: ToastrService) {
    }

    ngOnInit() {

        this.refreshList();

    }

    refreshList() {
        this.contactService.getContactList().subscribe(res => this.contactService.contactList = res as Contact[]);
    }

    addOrEditNewContact(contact: Contact, phoneId: number) {


        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.height = "46%";
        dialogConfig.data = {contact, phoneId};

        this.dialog.open(PopupContactComponent, dialogConfig).afterClosed().subscribe(res => {
                this.refreshList();
                this.PhoneNumberID = 0;
            }
        );

    }

    deleteContact(contactID: number) {
        if (confirm("Are you sure to delete this contact?")) {
            this.contactService.deleteContact(contactID).subscribe(() => {
                this.refreshList();
                this.toastr.error("Deleted successfully")

            })
        }
    }

    onChangePhoneNumber(event) {

        this.PhoneNumberID = event.target.selectedIndex;
    }

    onAddPhoneNumber(contactID: number) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "20%";
        dialogConfig.height = "20%";
        dialogConfig.data = {contactID};

        this.dialog.open(PopupPhoneComponent, dialogConfig).afterClosed().subscribe(() => {
            this.refreshList();

        });
    }

    deletePhone(phoneId: number){
        if(confirm("Are you sure to delete phone?")){

            this.phoneService.deletePhone(phoneId).subscribe(()=>{
                this.toastr.error("Phone deleted");
                this.refreshList();
            });
        }
    }

}
