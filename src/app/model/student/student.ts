export interface JsStudentValue {
  id: number
  first_name: string
  last_name: string
  birth_day: Date
  gender: Gender
  birth_place: string
  address: string
  phone: string
  entry_point: number
  status: Status
}

export enum Gender {
  MALE = "male",
  FEMALE = "female"
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface JsStudentRequest {
  id: number
  value: any
}
