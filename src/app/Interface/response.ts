import {HttpStatusCode} from "@angular/common/http";

export interface Response {
  message:string
  httpStatus:HttpStatusCode
  body:any
}
