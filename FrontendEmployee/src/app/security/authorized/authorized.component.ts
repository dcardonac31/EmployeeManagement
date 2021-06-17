import { Component, Input, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  @Input()
  rol: string;



  ngOnInit(): void {
  }

  isAuthorized(): boolean{
    if(this.rol){
      return this.securityService.getRol() === this.rol;
    } else{
      return this.securityService.isLogin();
    }
  }

}
