export interface JsUserValue {
  id: number
  user_name: string
  password: string
  full_name: string
  status: Status
  create_at: Date
  role: Role
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher'
}

export interface JsUserRequest {
  id: number
  value?: any
}
