import {Component} from '@angular/core';
import {Employee} from "../Interface/employee";
import {EmployeeService} from "../service/employee.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: Employee[] | undefined;
  error:string|null = null;



  constructor(private employeeService: EmployeeService,
              private router: Router
  ) {
  }

  ngOnInit() {
    console.log("checking")
    this.getEmployees();
  }

  updateEmployee(id: number) {
    console.log(id)
    this.router.navigate(['update-employee', id])
  }

  // redirectTo(uri: string) {
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
  //     this.router.navigate([uri]));
  // }
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    console.log(currentUrl);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployeeById(id).subscribe(data => console.log(data.message));
    this.getEmployees();
    this.reloadCurrentRoute();


  }

  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe({
      next: data=> {
        this.employees = data.body

      },
      error:(error) => this.error="Client was unable to connect to the server"

    })


  }
}

