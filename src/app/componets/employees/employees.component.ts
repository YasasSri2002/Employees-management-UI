import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { ViewService } from '../../services/view.service';
import Swal from 'sweetalert2';
import {  FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { bootstrapAppScopedEarlyEventContract } from '@angular/core/primitives/event-dispatch';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  
  public employees: Employee[] = [];

  public selectedEmployee = {
    empId: 0,
    empName: "",
    age: "",
    contact: "",
    email: "",
    salary: ""
    }

    public updateForm : FormGroup;

  constructor (private manageEmployee: ViewService , private fb: FormBuilder){
    this.updateForm =this.fb.group({
      empId: [this.selectedEmployee?.empId || 0, [Validators.required]],
      empName: [this.selectedEmployee?.empName || '', [Validators.required]],
      email: [this.selectedEmployee?.email || '', [Validators.required, Validators.email]],
      age: [this.selectedEmployee?.age || '', [Validators.required]],
      contact: [this.selectedEmployee?.contact || '', [Validators.required]],
      salary: [this.selectedEmployee?.salary || '', [Validators.required]],
    })
  }

  public clearForm(){
    this.updateForm.reset();
  }
 
  ngOnInit(): void {
   this.viewEmployees();
  }

  public viewEmployees(){
    this.manageEmployee.view().subscribe((data: Employee[])=>{
      this.employees = data;
      console.log(this.employees);
    })
  }

 
  


  public deleteEmployee(id: Number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.manageEmployee.delete(id).subscribe(data => {
          console.log(data);

          Swal.fire({
            title: "Deleted!",
            text: "Employee has been deleted.",
            icon: "success"
          });

          this.viewEmployees();
        })
      }
    });


  }


  public onUpdate(employee :Employee){
    this.selectedEmployee = employee;
    this.updateForm.patchValue({
      empId: employee.empId,
      empName: employee.empName,
      email: employee.email,
      age: employee.age,
      contact: employee.contact,
      salary: employee.salary
  })
  }

  


  public updateEmployee(id : Number , selectedEmployee : Employee){
    selectedEmployee = this.updateForm.value as Employee
    if(this.updateForm.invalid){
      Swal.fire({
        title:"Update",
        text: "Some Field are empty",
        icon:"error"
      })
      
    }else{
      this.manageEmployee.update(id,selectedEmployee).subscribe((res)=>{
        console.log(res);
        this.clearForm();

        Swal.fire({
          title: "Updated",
          text: "Employee has been Updated",
          icon: "success",
        });
        this.viewEmployees();
      })
      
    }
    
  }

  
}
