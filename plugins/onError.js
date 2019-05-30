import { notification } from 'antd'

export default {
  onError(e) {
    e.preventDefault()
    notification.error({
      message: '发生了一个错误',
      description: (e.msg || e.message)
    })
  },
}
