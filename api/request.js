import { request } from './index.js'

const appid = 'wx0569d3b36ca2699c'

export const login = (data) => {
  return request({ method: 'GET', url: `/wx/user/${appid}/login`, data })
}

// 获取科目列表
export const getSubjects = () => {
  return request({ method: 'GET', url: '/subjects' })
}

// 获取预约列表
export const getAppointments = (data) => {
  return request({ method: 'GET', url: `/user_appointment/appointments`, data })
}