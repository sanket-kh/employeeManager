import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../Interface/employee";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {concatWith} from "rxjs";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  updateEmpFrom!: FormGroup;
  employee!: Employee;
  id!: number;

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private routes: Router) {
  }


  ngOnInit() {
    this.updateEmpFrom = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      jobTitle: ['', Validators.required],
      phone: ['', Validators.required]
    })
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
        console.log(data.body);
        this.employee = data.body;
        console.log(this.employee);
        this.setForm()

      }

      // error: err => console.log(err),
      // complete: ()=> console.log('completed')

    )


  }


  onSubmit() {
    this.employee = this.updateEmpFrom.value
    this.employeeService.updateEmployee(this.employee, this.id).subscribe({
      next: data => this.employee = data.body,
      error: err => console.log(err),

    })
    this.routes.navigate(['/employees'])
  }

  setForm() {
    this.updateEmpFrom.setValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      jobTitle: this.employee.jobTitle,
      phone: this.employee.phone
    })
  }

  resetForm() {
    this.updateEmpFrom.reset()
  }
}
