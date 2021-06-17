import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDTO, EmployeeCreateDTO } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {

  constructor(private router: Router, private employeeService: EmployeeService) { }

  saveChanges(employee: EmployeeCreateDTO){
    this.employeeService.create(employee).subscribe(() => {
      this.router.navigate(['/employee']);
      console.log(employee);
    }, error => console.error(error));
  }

}
