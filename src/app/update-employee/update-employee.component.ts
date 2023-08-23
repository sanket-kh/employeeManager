import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../Interface/employee";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  updateEmpForm!: FormGroup;
  employee!: Employee;
  id!: number;
  private NameRegex = '^[A-Z][a-zA-Z]{2,10}$'

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private routes: Router) {
  }


  ngOnInit() {
    this.updateEmpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(this.NameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(this.NameRegex)]],
      email: ['', [Validators.email, Validators.required]],
      jobTitle: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^9[0-9]{9}$')]]
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
    this.employee = this.updateEmpForm.value
    this.employeeService.updateEmployee(this.employee, this.id).subscribe({
      next: data => this.employee = data.body,
      error: err => console.log(err),

    })
    this.routes.navigate(['/employees'])
  }

  setForm() {
    this.updateEmpForm.setValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      jobTitle: this.employee.jobTitle,
      phone: this.employee.phone
    })
  }

  resetForm() {
    this.updateEmpForm.reset()
  }
}
