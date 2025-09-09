import axiosInstance from "../Interceptor/AxiosInterceptor"

const getAppointmentDetails = async (id: any) => {
    return axiosInstance.get('/appointments/'+id)
    .then((res) => res.data)
    .catch((err) => {throw err})
}

const scheduleAppointment = async (appointment:any) => {
    return axiosInstance.post('/appointments/schedule',appointment)
    .then((res) => res.data)
    .catch((err) => {throw err})

}
const cancelAppointment = async (id:any) => {
    return axiosInstance.put('/appointments/cancel/'+id)
    .then((res) => res.data)
    .catch((err) => {throw err})

}
const completeAppointment = async (id:any) => {
    return axiosInstance.put('/appointments/complete/'+id)
    .then((res) => res.data)
    .catch((err) => {throw err})

}
const getAppointmentsDetailsWithName = async (id:any) => {
    return axiosInstance.get('/appointments/details/'+id)
    .then((res) => res.data)
    .catch((err) => {throw err})

}
export {getAppointmentDetails,scheduleAppointment,cancelAppointment,getAppointmentsDetailsWithName,completeAppointment}