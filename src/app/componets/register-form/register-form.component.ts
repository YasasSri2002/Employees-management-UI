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


  onSubmit(){
    const data = this.registerForm.value as Employee
    this.registerSerice.registerEmployee(data).subscribe((res: Employee)=>{
      console.log(res);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }


}
