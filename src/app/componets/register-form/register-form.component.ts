import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { NgIf } from '@angular/common';
import { RegisterService } from '../../services/register.service';
import { Employee } from '../../model/employee.model';
import Swal from 'sweetalert2';
import { ViewService } from '../../services/view.service';
import { ErrorResponse } from '../../model/errorResponse.model';







@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {


  constructor(private registerService: RegisterService, private manageEmployee: ViewService) {}


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


  onSubmit() {
    if (this.registerForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please fill out all required fields correctly.',
        showConfirmButton: true,
        timer: 1500,
      });
      return;
    }

    const value = this.registerForm.value as Employee;

    this.registerService.registerEmployee(value).subscribe({
      next: (data: any) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Registered',
          showConfirmButton: true,
        });
      },
      error: (err: any) => {
        console.log(err.status);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.message, // This will display the error message from the backend
          showConfirmButton: true,
        });
      },
    });
  }

}
