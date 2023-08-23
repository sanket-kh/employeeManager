import {Component} from '@angular/core';
import {Employee} from "../Interface/employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  employee!: Employee
  addEmpForm!: FormGroup
  NameRegex: string = '^[A-Z][a-zA-Z]{2,10}$'

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              private router: Router) {
  }


  onSubmit() {
    console.log(this.addEmpForm)
    this.employee = this.addEmpForm.value
    this.saveEmployee()
    this.resetForm()
  }

  ngOnInit() {
    this.addEmpForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.pattern(this.NameRegex)]],
        lastName: ['', [Validators.required, Validators.pattern(this.NameRegex)]],
        email: ['', [Validators.email, Validators.required]],
        jobTitle: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^9[0-9]{9}$')]]
      }
    )
  }

  resetForm() {
    this.addEmpForm.reset()
  }

  saveEmployee() {
    return this.employeeService.createEmployee(this.employee).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
      complete: () => console.log('completed')
    })
  }

  goToEmoloyeeList() {
    this.router.navigate(['/employees'])
  }

  checkLength($event: Event) {
    console.log()
  }
}
