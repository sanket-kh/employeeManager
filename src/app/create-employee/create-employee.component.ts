import {Component} from '@angular/core';
import {Employee} from "../Interface/employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  employee!:Employee
  addEmpForm!:FormGroup
  constructor(private fb:FormBuilder,
              private employeeService:EmployeeService,
              private router:Router) {
  }


  onSubmit() {
  console.log(this.addEmpForm)
      this.employee=this.addEmpForm.value
    this.saveEmployee()
     this.resetForm()
  }
  ngOnInit(){
    this.addEmpForm= this.fb.group({
        firstName: ['', ],
        lastName:['',Validators.required ],
        email:['', Validators.email],
        jobTitle:['',Validators.required],
        phone:['',Validators.required]
    }
    )
  }

  resetForm() {
    this.addEmpForm.reset()
  }
  saveEmployee(){
   return this.employeeService.createEmployee(this.employee).subscribe({
      next: data=>console.log(data),
     error: err => console.log(err),
      complete: ()=>console.log('completed')
  })
  }
  goToEmoloyeeList(){
    this.router.navigate(['/employees'])
  }
}
