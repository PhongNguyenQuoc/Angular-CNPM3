import { HttpClient }                                  from '@angular/common/http'
import { Injectable }                                  from '@angular/core'
import { Router }                                      from '@angular/router'
import { Emittable, Emitter, EmitterAction, Receiver } from '@ngxs-labs/emitter'
import { State, StateContext }                         from '@ngxs/store'
import { StorageService }                              from 'src/app/auth/_services/storage.service'

export interface JsValueJwt {
  token: string,
  roles: string[]
}

/**
 * The state name
 */
const STATE_NAME = 'jwt__state'

export namespace JwtState {

  /**
   * Data model of state
   */
  export interface Model {
    data: JsValueJwt
  }
}

/**
 * The endpoint of APIs
 */
const STATE_API = {
  LOGIN: `http://localhost:3000/auth/login`
}

/**
 * Default state values
 */
const STATE_DEFAULT_VALUES: JwtState.Model = {
  data: undefined
}

/**
 * Product management
 */
@Injectable()
@State<JwtState.Model>({
  name    : STATE_NAME,
  defaults: STATE_DEFAULT_VALUES
})
export class JwtState {

  @Emitter(JwtState.login) static actLogin: Emittable<any>
  @Emitter(JwtState.reLogin) static actReLogin: Emittable<void>

  // --[ Properties ]-----------------------------------------------------------
  private static http: HttpClient
  private static storageService: StorageService
  private static router: Router

  //-- [ Methods ] -------------------------------------------------------------
  constructor(
    http: HttpClient,
    storageService: StorageService,
    router: Router
  ) {
    JwtState.http           = http
    JwtState.storageService = storageService
    JwtState.router         = router
  }

  @Receiver()
  static login(
    ctx: StateContext<JwtState.Model>,
    action: EmitterAction<any>
  ) {
    return this.http.post<JsValueJwt>(STATE_API.LOGIN, {...action.payload}).
      subscribe(data => {
        ctx.patchState({data: data})
        this.storageService.saveJwt(data)
       })
  }

  @Receiver()
  static reLogin(
    ctx: StateContext<void>
  ) {
    this.storageService.clean()
    let ref = this.router.routerState.snapshot.url
    if (ref == '/login') ref = 'home'
    this.router.navigate([`login`], {state: { ref: ref }})
  }
}
