import { Mock, Constant, qs, randomAvatar } from './_utils'

const { ApiPrefix, Color } = Constant

const Dashboard = Mock.mock({
  'data|80-100': [
    {
      'id|+1': 0,
      deviceNumber: '@word',
      shopName: '@word',
      shopType: '@word',
      address: '@word',
      shopKeeper: '@word',
      keeperMobile: '@word',
      systemVersion: '@word',
      status: '@word',
      onlineTime: '@word',
      sequenceName: '@word',
    }
  ]
})

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] == key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

let database = Dashboard.data

module.exports = {
  [`POST ${ApiPrefix}/box/boxBackApi/queryDevicePage.json`](req, res) {
    const { body } = req
    let { pageSize, page, ...other } = body
    pageSize = pageSize || 10
    page = page || 1

    let newData = database

    res.json({
      "code": "200",
      "data": {
        "currentIndex": 1,
        "items": newData.slice((page - 1) * pageSize, page * pageSize),
        "nextIndex": 1,
        "pageSize": 10,
        "preIndex": 0,
        "totalNumber": newData.length,
        "totalPage": 0
      },
      "msg": "success",
      "success": true,
      "traceId": "4WX0KI"
    })
  },
  [`POST ${ApiPrefix}/boxback/boxBackApi/queryDeviceById.json`](req, res) {
    const { body } = req
    let { id } = body
    res.json({
      "success": true,
      "data": {
        "id": id,
        "deviceNumber": "x",
        "shopName": "x",
        "shopType": 'x',
        "shopTypeName": 'x',
        "address": "x",
        "shopKeeper": "x",
        "keeperMobile": "x",
        "systemVersion": "x",
        "status": 'x',
        "onlineTime": "x",
        "sequenceName": "x"
      },
      "msg": "",
      "code": "",
      "traceId": ""
    })
  },
  [`POST ${ApiPrefix}/box/boxBackApi/saveOrUpdateMaterial.json`](req, res) {
    let newData = req.body
    let isExist = false
    if(newData.id !== undefined) {
      database = database.map(item => {
        if(item.id === newData.id) {
          isExist = true
          return Object.assign({}, item, newData)
        } else {
          return item
        }
      })
    } else {
      newData.id = Mock.mock('@id')
      database.unshift(newData)
    }
    if(isExist) {
      res.json({
        "success": true,
        "data": {},
        "msg": '',
        "code": "",
        "traceId": ""
      })
    } else {
      res.json({
        "success": false,
        "data": {},
        "msg": 'NOT FOUND',
        "code": "",
        "traceId": ""
      })
    }
  },
}
