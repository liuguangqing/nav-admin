import mockjs from 'mockjs'
export default {
  'get /api/visualist': mockjs.mock ({
    "data|121-140": [{
      "zid|+1": 1,
      "zname": "@name",
      "createman|1": ["男", "女"],
      "time": "@email"
  }]
  })
}