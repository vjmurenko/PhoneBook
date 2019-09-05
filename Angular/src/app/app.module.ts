import { ContactService } from './service/contact.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import {AppComponent} from './app.component';

import { ContactComponent } from './contact/contact.component';
import { PopupContactComponent } from './popup-contact/popup-contact.component';
import { PopupPhoneComponent } from './popup-phone/popup-phone.component';
import {NgxMaskModule} from "ngx-mask-2";



@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        PopupContactComponent,
        PopupPhoneComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxMaskModule.forRoot()
    ],
    entryComponents:[PopupContactComponent, PopupPhoneComponent],
    providers: [ContactService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
