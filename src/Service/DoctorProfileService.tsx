import axiosInstance from "../Interceptor/AxiosInterceptor"

const getDoctor = async (id: any) => {
    return axiosInstance.get('/profile/doctor/get/'+id)
    .then((res) => res.data)
    .catch((err) => {throw err})
}

const updateDoctor = async (id: any, doctor: any) => {
    return axiosInstance.put('/profile/doctor/update/'+id, doctor)
    .then((res) => res.data)
    .catch((err) => {throw err})

}
const getDoctorDropDown = async () => {
    return axiosInstance.get('/profile/doctor/dropdown')
    .then((res) => res.data)
    .catch((err) => {throw err})

}
export {getDoctor,updateDoctor,getDoctorDropDown}