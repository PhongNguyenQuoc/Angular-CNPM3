import {JSSubjectValue} from "../subject/subject";
import {Gender, JsStudentValue} from "../student/student";

export interface JsMarkValue {
  id: number,
  grade_first: number,
  grade_second: number,
  grade_third: number,
  student: JsStudentValue
  subject: JSSubjectValue
}

export interface JsMarkRequest {
  subject_id?: number
  value?: any
}


export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}
