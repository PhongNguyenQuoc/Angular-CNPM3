import {JsStudentRequest, JsStudentValue} from "../../../model/student/student";
import {Injectable} from "@angular/core";
import {State, StateContext} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";
import {Emittable, Emitter, EmitterAction, Receiver} from "@ngxs-labs/emitter";
import {take, tap} from "rxjs";
import {PathBind} from "../../../../commons/pipe-path-bind";

export namespace StudentState {

  export type Student = JsStudentValue

  /**
   * Data model of state
   */
  export interface Model {
    data: Student[]
  }
}

/**
 * State name
 */
const STATE_NAME = 'student__state'

/**
 * The API's endpoint
 */
const STATE_API = {
  GET: '/api/student',
  ADD: '/api/student',
  UPDATE: 'http://localhost:3000/api/student/:id'
}

/**
 * Default state values
 */
const STATE_DEFAULT_VALUES: StudentState.Model = {
  data: []
}

/**
 * Subject manager
 */
@Injectable()
@State<StudentState.Model>({
  name: STATE_NAME,
  defaults: STATE_DEFAULT_VALUES
})

export class StudentState {

  // --[ Properties ]-----------------------------------------------------------
  private static http: HttpClient

  constructor(http: HttpClient) {
    StudentState.http = http
  }

  @Emitter(StudentState.load) static actLoad: Emittable<void>
  @Emitter(StudentState.add) static actAdd: Emittable<any>
  @Emitter(StudentState.update) static actUpdate: Emittable<JsStudentRequest>

  @Receiver()
  static load(
    ctx: StateContext<StudentState.Model>
  ) {
    return this.http.get<StudentState.Student[]>(STATE_API.GET).pipe(take(1), tap(data => {
      ctx.patchState({data})
    }))
  }

  @Receiver()
  static add(
    ctx: StateContext<StudentState.Model>,
    action: EmitterAction<StudentState.Student>
  ) {
    return this.http.post<any>(STATE_API.ADD, {...action.payload})
  }

  @Receiver()
  static update(
    ctx: StateContext<StudentState.Model>,
    action: EmitterAction<JsStudentRequest>
  ) {
    const id = { id: action.payload.id }
    const url= PathBind.transform(STATE_API.UPDATE, id)
    return this.http.put<any>(url, {...action.payload.value})
  }
}
