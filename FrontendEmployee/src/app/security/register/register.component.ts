import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseApiErrors } from 'src/app/utilities/utilities';
import { userCredential } from '../security';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  errors: string[] = [];

  register(credentials: userCredential){
    console.log(credentials);
    this.securityService.register(credentials)
    .subscribe(response => {
      this.securityService.saveTokenLocalStorage(response);
      this.router.navigate(['/']);
    }, errors => this.errors = parseApiErrors(errors))
  }
}
