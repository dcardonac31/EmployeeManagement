import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeCreateDTO, EmployeeDTO } from '../employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup

  @Input()
  model: EmployeeCreateDTO;

  @Output()
  onSubmit: EventEmitter<EmployeeCreateDTO> = new EventEmitter<EmployeeCreateDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idDocument: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      name: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      lastName: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      hiringDate: '',
      position: [
        '',
        {
          validators: [Validators.required]
        }
      ],
    });
    
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  
  saveChanges(){
    this.onSubmit.emit(this.form.value);
  }

}
