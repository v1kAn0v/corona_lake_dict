import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import router from '../router'

// create a new axios instance
const instance = axios.create({
  baseURL: process.env.ROOT_API,
  timeout: 3000000,
  withCredentials: true
})

instance.baseURL = process.env.ROOT_API
// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  window.theApp.setIsLoading(true)
  return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
  window.theApp.setIsLoading(false)
  return response
},
error => {
  window.theApp.setIsLoading(false)
  console.log('The error: ' + error)
  if (error.response.status === 401) {
    window.theApp.clean()
    router.push({path: '/login', query: null})
  } else if (error.response.status >= 400) {
    console.log('error accessing url ' + error.request.responseURL + ', service may be down!')

    throw new Error('תקלה בזמינות השרת אנא פנה למוקד התמיכה: 074-7418810')
  } else {
    throw error
  }
})

// *************************************** Mockups ********************************************* //
if (process.env.USE_MOCKS === true) {
  // alert('Using mocks!')
  var mock = new MockAdapter(axios)
   // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  mock.onGet('bpm/task/all').reply(200, [
      {processInstanceId: '1', vars: {FileName: 'caseName', FileID: 'caseNum', sugiaName: 'sugia'}, taskDefinitionKey: 'checkReportTask', name: 'I am a mock task', priority: '1', 'due': new Date(), 'created': new Date()}
  ]).onAny().passThrough()
}
// *************************************** End of Mockups ********************************************* //
export default instance

// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import router from '../router'

// // create a new axios instance
// const instance = axios.create({
//   baseURL: process.env.ROOT_API,
//   timeout: 3000000,
//   withCredentials: true
// })

// instance.baseURL = process.env.ROOT_API
// // before a request is made start the nprogress
// instance.interceptors.request.use(config => {
//   window.theApp.setIsLoading(true)
//   return config
// })

// // before a response is returned stop nprogress
// instance.interceptors.response.use(response => {
//   window.theApp.setIsLoading(false)
//   return response
// },
// error => {
//   window.theApp.setIsLoading(false)
//   console.log('The error: ' + error)
//   if (error.response.status === 401) {
//     window.theApp.clean()
//     router.push({path: '/login', query: null})
//   } else if (error.response.status >= 400) {
//     console.log('error accessing url ' + error.request.responseURL + ', service may be down!')

//     throw new Error('תקלה בזמינות השרת אנא פנה למוקד התמיכה: 074-7418810')
//   } else {
//     throw error
//   }
// })

// // *************************************** Mockups ********************************************* //
// if (process.env.USE_MOCKS === true) {
//   // alert('Using mocks!')
//   var mock = new MockAdapter(axios)
//    // Mock any GET request to /users
//   // arguments for reply are (status, data, headers)
//   mock.onGet('bpm/task/all').reply(200, [
//       {processInstanceId: '1', vars: {FileName: 'caseName', FileID: 'caseNum', sugiaName: 'sugia'}, taskDefinitionKey: 'checkReportTask', name: 'I am a mock task', priority: '1', 'due': new Date(), 'created': new Date()}
//   ]).onAny().passThrough()
// }
// // *************************************** End of Mockups ********************************************* //
// export default instance

