import { Mock, Constant, qs, randomAvatar } from './_utils'

const { ApiPrefix, Color } = Constant

const Dashboard = Mock.mock({
  'data|80-100': [
    {
      'id|+1': 0,
      name: '@name',
      resourceUrl: () => randomAvatar(),
      advertiseLocation: () => { return Math.floor(Math.random() * 4)},
      qrCodeUrl: () => randomAvatar(),
      'isQrCodeShow|0-1': 0,
      qrCodeDesc: '@title',
      'isShopInfoShow|0-1': 0,
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
  [`POST ${ApiPrefix}/boxback/boxBackApi/queryMaterialPage.json`](req, res) {
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
  [`POST /common/boxFileUploadApi/upload.json`](req, res) {
    let url = randomAvatar()
    res.json({
      "success": true,
      "data": url,
      "msg": "",
      "code": "",
      "traceId": ""
    })
  },
  [`POST ${ApiPrefix}/boxback/boxBackApi/saveOrUpdateMaterial.json`](req, res) {
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
  [`POST ${ApiPrefix}/boxback/boxBackApi/deleteMaterial.json`](req, res) {
    const { id } = req.body
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id != id)
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
  }
}
