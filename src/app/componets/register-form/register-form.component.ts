import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../Service/employee.service';
import { HttpClientModule } from '@angular/common/http';





@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf ,HttpClientModule ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {

  employee: Employee = {
    empName: '',
    age: '',
    email: '',
    contact: '',
    salary : ''
  }
  
 public registerForm: FormGroup;

  constructor(private fb : FormBuilder,
    private employeeService: EmployeeService
  ){
    this.registerForm = this.fb.group({
      empName:['',Validators.required],
      age:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      contact:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      salary:['',Validators.required]
    })
  }

  ngOnInit(): void {
    
  }


  onSubmit(){
    this.employeeService.addEmployee(this.employee).subscribe((data)=>{
      console.log(data)
    }
    );
  }



}
