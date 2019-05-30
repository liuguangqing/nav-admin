import { Mock, Constant, qs, randomAvatar } from './_utils'

const { Random } = Mock
const { ApiPrefix, Color } = Constant

const Dashboard = Mock.mock({
  'data|80-100': [
    {
      "id|+1": 0,
      "name": "@name",
      "endTime": "2019/12/12",
      "groupList|2-3": [
        {
          "name": "@name",
          "advertiseLocation": () => Random.integer( 0, 3 ),
          "startDate": "2018/12/12",
          "endDate": "2019/12/12",
          "startTime": "18:34:22",
          "startTime": "18:35:22",
          "playDuration": () => Random.integer( 100, 200 ),
          "space": () => Random.integer( 100, 200 ),
          "materialList": [
            {
              "advertiseMaterialId|+1": 0,
              advertiseMaterialName: '@name',
              "orderNumber|+1": 1,
              "playDuration": () => Random.integer( 100, 200 ),
              "qrCodeRemainDuration": () => Random.integer( 100, 200 )
            }
          ]
        }
      ]
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
  [`POST ${ApiPrefix}/boxback/boxBackApi/querySequenceById.json`](req, res) {
    const { body } = req
    let { id } = body
    res.json({
      "success": true,
      "data": database[id],
      "msg": id,
      "code": "",
      "traceId": ""
    })
  },
  [`POST ${ApiPrefix}/boxback/boxBackApi/querySequencePage.json`](req, res) {
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
}
