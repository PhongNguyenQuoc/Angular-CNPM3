import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Emitter, EmitterAction} from "@ngxs-labs/emitter";
import { Emittable } from "@ngxs-labs/emitter";
import { Receiver } from "@ngxs-labs/emitter";
import { State, StateContext } from "@ngxs/store";
import { take, tap } from "rxjs";
import { JSSubjectValue, JsRequest } from "src/app/model/subject/subject";
import {PathBind} from "../../../../commons/pipe-path-bind";

export namespace SubjectState {

  export type Subject = JSSubjectValue

  /**
   * Data model of state
   */
  export interface Model {
    data: Subject[]
  }
}

/**
 * State name
 */
const STATE_NAME = 'subject__state'

/**
 * The API's endpoint
 */
const STATE_API = {
  GET: '/api/subject',
  ADD: '/api/subject',
  UPDATE: 'http://localhost:3000/api/subject/:id'
}

/**
 * Default state values
 */
const STATE_DEFAULT_VALUES: SubjectState.Model = {
  data: []
}

/**
 * Subject manager
 */
@Injectable()
@State<SubjectState.Model>({
  name: STATE_NAME,
  defaults: STATE_DEFAULT_VALUES
})

export class SubjectState {

    // --[ Properties ]-----------------------------------------------------------
  private static http: HttpClient

  //-- [ Methods ] -------------------------------------------------------------
  constructor(http: HttpClient) {
    SubjectState.http = http
  }

  //-- [ Properties ]--------------------------------------------------------
  @Emitter(SubjectState.load) static actLoad: Emittable<void>
  @Emitter(SubjectState.add) static actAdd: Emittable<any>
  @Emitter(SubjectState.update) static actUpdate: Emittable<any>

  @Receiver()
  static load(
    ctx: StateContext<SubjectState.Model>,
  ) {
    return this.http.get<SubjectState.Subject[]>(STATE_API.GET).pipe(take(1),tap(data => {
      ctx.patchState({data });
    }))
  }

  @Receiver()
  static add(
    ctx: StateContext<SubjectState.Model>,
    action: EmitterAction<SubjectState.Subject>
  ) {
    return this.http.post<any>(STATE_API.ADD, {...action.payload})
  }

  @Receiver()
  static update(
    ctx: StateContext<SubjectState.Model>,
    action: EmitterAction<JsRequest>
  ) {
    const id = { id: action.payload.id }
    const url= PathBind.transform(STATE_API.UPDATE, id)
    return this.http.put<any>(url, {...action.payload.value})
  }
}
