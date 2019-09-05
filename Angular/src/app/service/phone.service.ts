import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Phone} from "../model/phone.model";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) { }


  putPhone(contactId, phoneNumber, phoneID){
    var body ={
      ContactId : contactId,
      PhoneNumber: phoneNumber,
      Id: phoneID
    };
    return this.http.put(environment.apiURL + '/Phone/' + phoneID, body);
  }

  postPhone(formData: Phone){
    return this.http.post(environment.apiURL + '/Phone', formData);
  }

  deletePhone(phoneId: number){
    return this.http.delete(environment.apiURL + '/Phone/' + phoneId);
  }
}
