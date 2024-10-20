import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { NgIf } from '@angular/common';
import { RegisterService } from '../../services/register.service';
import { Employee } from '../../model/employee.model';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {

  constructor(private registerSerice: RegisterService) {}

  public registerForm = new FormGroup({
    empName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    salary: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    
  }

  public clearForm(){
    this.registerForm.reset();
  }


  onSubmit(){
    const data = this.registerForm.value as Employee
    if(this.registerForm!){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please try again",
        showConfirmButton: true,
        timer: 1500
      });
    }else{
      this.registerSerice.registerEmployee(data).subscribe((res: Employee)=>{
        console.log(res);
  
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Employee Registered Compeleted",
          showConfirmButton: false,
          timer: 1500
        });
        this.clearForm()
      });
    }
   


  }


}
