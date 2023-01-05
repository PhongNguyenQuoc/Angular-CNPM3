import {Injectable} from "@angular/core";
import {State, StateContext} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";
import {Emittable, Emitter, EmitterAction, Receiver} from "@ngxs-labs/emitter";
import {JsMarkRequest, JsMarkValue} from "../../../model/mark/mark";
import {take} from "rxjs";
import {tap} from "rxjs/operators";

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
  GET: 'http://localhost:3000/api/mark',
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

  @Receiver()
  static load(
    ctx: StateContext<MarkState.Model>,
    action: EmitterAction<any>
  ) {
    return this.http.get<MarkState.Mark[]>(STATE_API.GET, {params: {subject_id: action.payload.subject_id}}).pipe(take(1), tap(data => {
          ctx.patchState({data})
    }))
  }
}
