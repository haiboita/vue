import request from '@/utils/request'

export function getCompanyNews(url1) {
  return request({
    url: url1,
    method: 'post',
  })
}

export function getNewsInformation(url2) {
  return request({
    url: url2,
    method: 'post',
  })
}