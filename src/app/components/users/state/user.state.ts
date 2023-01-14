import {JsUserRequest, JsUserValue} from "../../../model/user/user";
import {Injectable} from "@angular/core";
import {State, StateContext} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";
import {Emittable, Emitter, EmitterAction, Receiver} from "@ngxs-labs/emitter";
import {PathBind} from "../../../../commons/pipe-path-bind";
import {take, tap} from "rxjs";

export namespace UserState {

  export type User = JsUserValue

  /**
   * Data
   */
  export interface Model {
    data: User[]
  }
}

/**
 * State name
 */
const STATE_NAME = 'user__state'

/**
 * The API's endpoint
 */
const STATE_API = {
  GET: '/api/user',
  ADD: '/api/user',
  UPDATE: 'http://localhost:3000/api/user/:id',
  USERDETAIL: 'http://localhost:3000/api/user/:id'
}

/**
 * Default state values
 */
const STATE_DEFAULT_VALUES:UserState.Model = {
  data: []
}

/**
 * Subject manager
 */
@Injectable()
@State<UserState.Model>({
  name: STATE_NAME,
  defaults: STATE_DEFAULT_VALUES
})

export class UserState {

  // --[ Properties ]-----------------------------------------------------------
  private static http: HttpClient

  constructor(http: HttpClient) {
    UserState.http = http
  }

  @Emitter(UserState.load) static actLoad: Emittable<void>
  @Emitter(UserState.add) static actAdd: Emittable<any>
  @Emitter(UserState.update) static actUpdate: Emittable<JsUserRequest>
  @Emitter(UserState.getByID) static actGetByID: Emittable<JsUserRequest>

  @Receiver()
  static load(
    ctx: StateContext<UserState.Model>,
  ) {
    return this.http.get<UserState.User[]>(STATE_API.GET).pipe(take(1),tap(data => {
      ctx.patchState({data });
    }))
  }

  @Receiver()
  static add(
    ctx: StateContext<UserState.Model>,
    action: EmitterAction<UserState.User>
  ) {
    return this.http.post<any>(STATE_API.ADD, {...action.payload})
  }

  @Receiver()
  static update(
    ctx: StateContext<UserState.Model>,
    action: EmitterAction<JsUserRequest>
  ) {
    const id = { id: action.payload.id }
    const url= PathBind.transform(STATE_API.UPDATE, id)
    return this.http.put<any>(url, {...action.payload.value})
  }
  @Receiver()
  static getByID(
    ctx: StateContext<UserState.Model>,
    action: EmitterAction<JsUserRequest>
  ) {
    const id = { id: action.payload.id }
    const url= PathBind.transform(STATE_API.USERDETAIL, id)
    return this.http.get<UserState.User[]>(url).subscribe(data =>{
      ctx.patchState({data})
    })
  }
}
