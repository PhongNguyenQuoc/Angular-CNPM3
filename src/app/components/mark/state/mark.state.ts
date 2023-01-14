import {Injectable} from "@angular/core";
import {State, StateContext} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";
import {Emittable, Emitter, EmitterAction, Receiver} from "@ngxs-labs/emitter";
import {JsMarkRequest, JsMarkValue} from "../../../model/mark/mark";
import {take} from "rxjs";
import {tap} from "rxjs/operators";
import {PathBind} from "../../../../commons/pipe-path-bind";

export namespace MarkState {
  export type Mark = JsMarkValue
  /**
   * Data model of state
   */
  export interface Model {
    data: Mark[]
  }


}
/**
 * State name
 */
const STATE_NAME = 'MARK__STATE'

/**
 * The API's endpoint
 */
const STATE_API = {
  GET: '/api/mark',
  UPDATE: 'http://localhost:3000/api/mark/:id',
  ADD: '/api/mark',
}

/**
 * Default state values
 */
const STATE_DEFAULT_VALUES: MarkState.Model = {
  data: []
}

/**
 * Subject manager
 */
@Injectable()
@State<MarkState.Model>({
  name: STATE_NAME,
  defaults: STATE_DEFAULT_VALUES
})
export class MarkState {

  // --[ Properties ]-----------------------------------------------------------
  private static http: HttpClient

  //-- [ Methods ] -------------------------------------------------------------
  constructor(http: HttpClient) {
    MarkState.http = http
  }

  @Emitter(MarkState.load) static actLoad: Emittable<JsMarkRequest>
  @Emitter(MarkState.update) static actUpdate: Emittable<JsMarkRequest>
  @Emitter(MarkState.add) static actAdd: Emittable<any>

  @Receiver()
  static load(
    ctx: StateContext<MarkState.Model>,
    action: EmitterAction<any>
  ) {
    return this.http.get<MarkState.Mark[]>(STATE_API.GET, {params: {subject_id: action.payload.subject_id}}).pipe(take(1), tap(data => {
          ctx.patchState({data})
    }))
  }

  @Receiver()
  static add(
    ctx: StateContext<MarkState.Model>,
    action: EmitterAction<MarkState.Mark>
  ) {
    return this.http.post<any>(STATE_API.ADD, {...action.payload})
  }

  @Receiver()
  static update(
    ctx: StateContext<MarkState.Model>,
    action: EmitterAction<JsMarkRequest>
  ) {
    const id = { id: action.payload.subject_id }
    const url= PathBind.transform(STATE_API.UPDATE, id)
    return this.http.put<any>(url, {...action.payload.value})
  }
}
