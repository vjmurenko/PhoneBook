import {Injectable, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Contact} from "../model/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  formData: Contact;
  contactList: Contact[] ;


  getContactList(){
    return this.http.get(environment.apiURL + '/Contact');
  }

  postContact(formData: Contact){
    return this.http.post(environment.apiURL +'/Contact', formData);

  }
  putContact(formData: Contact){
    return this.http.put(environment.apiURL + '/Contact/'+ formData.Id, formData);
  }

  deleteContact(id: number){
    return this.http.delete(environment.apiURL + '/Contact/' + id);
  }


}
