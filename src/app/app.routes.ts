import { Routes } from '@angular/router';
import { RegisterFormComponent } from './componets/register-form/register-form.component';
import { HomeComponent } from './componets/home/home.component';
import { EmployeesComponent } from './componets/employees/employees.component';
import { AboutComponent } from './componets/about/about.component';


export const routes: Routes = [
   {
    path : "",
    component: HomeComponent
   },
    {
        path: "home",
        component : HomeComponent,
    },
    {
        path: "register",
        component: RegisterFormComponent
    },
    {
        path: "employee",
        component: EmployeesComponent
    },
    {
        path: "about",
        component: AboutComponent
    }
];
