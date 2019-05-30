import request from 'utils/request'
import { apiPrefix } from 'utils/config'

import api from './api'

const gen = params => {
  let json = false
  // if(typeof params === 'object') {
  //   params = params.url
  //   json = true
  // }
  let url = apiPrefix + params
  let method = 'POST'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      params:data,
      method,
      json,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

module.exports = APIFunction
