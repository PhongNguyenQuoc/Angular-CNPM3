/*
 * Copyright IxiaS, Inc. All Rights Reserved.
 *
 * For the full copyright and license information,
 * please view the LICENSE file that was distributed with this source code.
 */

import { HttpParams }          from '@angular/common/http'
import { Pipe, PipeTransform } from '@angular/core'

/**
 * Path bind parameters
 */
interface PathBindParameters {
  [key: string]: {
    token: string  // Bind variable-name
    regex?: string  // Bind value regex
  }
}

/**
 * URL path binder for dynamic-call
 */
export class PathBind {
  static transform(
    base: string,
    bind: { [key: string]: any }   = {},
    params: { [key: string]: any } = {}
  ): string {
    return new PathBindPipe().transform(base, bind, params)
  }
}

/**
 * Pipe: URL path binder
 */
@Pipe({name: 'pathBind'})
export class PathBindPipe implements PipeTransform {

  /** Processing */
  transform(
    base: string,
    bind: { [key: string]: any }   = {},
    params: { [key: string]: any } = {}
  ): string {
    //- Step1) Replace bind placeholder
    let url          = base.slice(0)
    let paramsHttp   = new HttpParams()
    const paramsBind = this.buildPlaceholder(base)
    for (const [name, phold] of Object.entries(paramsBind)) {
      const value = bind[name]
      const token = phold.token
      const regex = phold.regex && new RegExp('^' + phold.regex + '$')
      if (value === undefined) {
        throw new Error('Not found a bind value : { name: ' + name + ' }')
      }
      if (regex && !String(value).match(regex)) {
        throw new Error('Regex could not match a bind value : { regex: ' + name + ', value: ' + value + ' }')
      }
      url = url.replace(token, value)
    }

    //- Step2) Append Get parameters
    for (const [key, value] of Object.entries(params)) {
      if (typeof (value) != 'undefined' && value != null) {
        paramsHttp = paramsHttp.append(key, value)
      }
      if (paramsHttp.keys().length > 0) {
        url = url.indexOf('?') === -1
          ? url + '?' + paramsHttp.toString()
          : url + '&' + paramsHttp.toString()
      }
    }
    return url
  }

  /**
   * Prase base path including placeholder.
   */
  private buildPlaceholder(path: string): PathBindParameters {
    // Initialize parameters
    const params: PathBindParameters = {}

    // Tokenize result
    let tokName: string[]  = []
    let tokRegex: string[] = []
    let tokToken: string[] = []

    // Status
    let marked     = false
    let stickiness = 0

    // Prase base path
    const toks     = path.replace(/^(http:\/\/.*?\/|https:\/\/.*?\/)/gi, '').split('')
    const toksTail = toks.length - 1
    toks.forEach((c, pos) => {
      // Whether valid token.
      if (!c.match(/[\x20-\x7e]/)) {
        throw new Error('Syntax error \'' + c + '\' : Invalid path specification.')
      }
      // Tokenize characters
      switch (stickiness) {
        case 0:
          if (c === '<') {
            throw new Error('Syntax error \'<\' : Invalid path specification.')
          }
          if (c === '>') {
            throw new Error('Syntax error \'>\' : Invalid path specification.')
          }
          if (c === ':') {
            tokToken.push(c)
            stickiness++
          }
          break
        case 1:
          if (c === '>') {
            throw new Error('Syntax error \'>\' : Invalid path specification.')
          } else if (c === ':') {
            throw new Error('Syntax error \':\' : Placeholder are duplicated registered on same dir.')
          } else if (c === '<') {
            tokToken.push(c)
            stickiness++
          } else if (c === ',') {
            stickiness--
            marked = true
          } else if (c === '?') {
            stickiness--
            marked = true
          } else if (c === '&') {
            stickiness--
            marked = true
          } else if (c === '/') {
            stickiness--
            marked = true
          } else {
            tokToken.push(c)
            tokName.push(c)
          }
          break
        case 2:
          if (c === '<') {
            throw new Error('Syntax error \'<\' : Invalid path specification.')
          } else if (c === '>') {
            tokToken.push(c)
            stickiness = 0
            marked     = true
          } else {
            tokToken.push(c)
            tokRegex.push(c)
          }
          break
        default:
          throw new Error('Syntax error : Invalid path specification.')
      }
      // Build placeholder data.
      if ((marked || pos === toksTail) && tokName.length > 0) {
        params[tokName.join('')] = {
          token: tokToken.join(''),
          regex: !!tokRegex.length ? tokRegex.join('') : undefined
        }
        tokName                  = []
        tokRegex                 = []
        tokToken                 = []
        marked                   = false
      }
    })
    return params
  }
}
