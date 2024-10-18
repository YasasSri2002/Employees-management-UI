import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { ViewService } from '../../services/view.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
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

    

  
  constructor (private manageEmployee: ViewService){}
 
  ngOnInit(): void {
   this.viewEmployees();
  }

  public viewEmployees(){
    this.manageEmployee.view().subscribe((data: Employee[])=>{
      this.employees = data;
      console.log(this.employees);
    })
  }

  public updateForm = new FormGroup({
    empId: new FormControl(),
    empName: new FormControl(''),
    age: new FormControl(''),
    contact: new FormControl(''),
    email: new FormControl(''),
    salary: new FormControl('')
  })


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
  }

  public updateEmployee(selectedEmployee : Employee ){
    this.viewEmployees();
    const data = this.updateForm.value as Employee
    console.log(data);
    this.manageEmployee.update(data).subscribe((res)=>{
      Swal.fire({
        title: "Updated!",
        text: "Employee has been Updated.",
        icon: "success"
      });

      this.viewEmployees();
    })
    
  }

  
}
