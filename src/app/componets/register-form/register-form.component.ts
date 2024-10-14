import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Employee } from '../../model/employee.model';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {

  constructor(){}

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
    console.log(this.registerForm.value)
  }


}
