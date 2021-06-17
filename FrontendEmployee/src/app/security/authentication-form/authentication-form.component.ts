import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userCredential } from '../security';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})
export class AuthenticationFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  form: FormGroup;

  @Input()
  errors: string[] = [];

  @Input()
  action: string;

  @Output()
  onSubmit: EventEmitter<userCredential> = new EventEmitter<userCredential>();



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required]
        }
      ]
    });
  }

  
getEmailErrorMessage(){
  var field = this.form.get('email');
  if(field.hasError('required')){
    return "The email field is required";
  }

  if(field.hasError('email')){
    return "The email is not valid";
  }

  return '';
}

}
