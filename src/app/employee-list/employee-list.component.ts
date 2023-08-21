import {Component} from '@angular/core';
import {Employee} from "../Interface/employee";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees!:Employee[];


  constructor(private employeeService:EmployeeService,
              private router : Router
  ) {
  }
  private getEmployees(){
    this.employeeService.getEmployeeList().subscribe( data=> {
      this.employees=data.body

    })
  }
  ngOnInit(){
    console.log("checking")
    this.getEmployees();
  }

  updateEmployee(id: number) {
    console.log(id)
    this.router.navigate(['update-employee', id])
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployeeById(id).subscribe( data=> console.log(data.message));
    this.getEmployees();


  }
}
