import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseApiErrors } from 'src/app/utilities/utilities';
import { userCredential } from '../security';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private router: Router) { }

  errors: string[] = [];

  ngOnInit(): void {
  }

  login(credentials: userCredential){
    this.securityService.login(credentials)
    .subscribe(response =>{
      this.securityService.saveTokenLocalStorage(response);
      this.router.navigate(['*']);
    }, errors => this.errors = parseApiErrors(errors));
  }

}
