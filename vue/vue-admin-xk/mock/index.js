import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import newsAPI from './news'
import membersAPI from './members'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)


//News
Mock.mock(/\/companyNews\/getCompanyNews/, 'post', newsAPI.getCompanyNews)
Mock.mock(/\/companyNews\/getNewsInformation/, 'post', newsAPI.getNewsInformation)

//Members
Mock.mock(/\/members\/getMembers/, 'post', membersAPI.getMembers)
Mock.mock(/\/members\/getFreeMembers/, 'post', membersAPI.getFreeMembers)

export default Mock
