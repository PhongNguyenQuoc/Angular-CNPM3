export interface JSSubjectValue {
  id: number
  name: string
  credits: number
  semester: number
  status: Status
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface JsRequest {
  id: number
  value: any
}
