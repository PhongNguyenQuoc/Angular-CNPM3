import {JSSubjectValue} from "../subject/subject";
import {Gender, JsStudentValue} from "../student/student";

export interface JsMarkValue {
  id: number,
  mark: number,
  student: JsStudentValue[]
  subject: JSSubjectValue[]
}

export interface JsMarkRequest {
  subject_id?: number
  student_id?: number
}


export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}
