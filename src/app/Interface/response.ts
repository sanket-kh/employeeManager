import {HttpStatusCode} from "@angular/common/http";
import {Employee} from "./employee";

export interface Response {
  message:string
  httpStatus:HttpStatusCode
  body:any
}
