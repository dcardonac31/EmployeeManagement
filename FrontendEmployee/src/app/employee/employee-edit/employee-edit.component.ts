import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeCreateDTO, EmployeeDTO } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  constructor(private router: Router, 
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute) { }

  model: EmployeeDTO;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      this.employeeService.getById(params.id)
      .subscribe(employee => {
        this.model = employee;
      }, () => this.router.navigate(['/employee']))
    });
  }

  saveChanges(employee: EmployeeCreateDTO){
    this.employeeService.edit(this.model.id, employee)
    .subscribe(() => {
      this.router.navigate([`/employee`])
    }, error => console.error(error))
  }


}
