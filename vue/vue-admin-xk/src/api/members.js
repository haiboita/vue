import request from '@/utils/request'

export function getMembers() {
  return request({
    url: '/members/getMembers',
    method: 'post',
  })
}

export function getFreeMembers() {
  return request({
    url: '/members/getFreeMembers',
    method: 'post',
  })
}