import axiosInstance from "../Interceptor/AxiosInterceptor"

const getPatient = async (id: any) => {
    return axiosInstance.get('/profile/patient/get/'+id)
    .then((res) => res.data)
    .catch((err) => {throw err})
}

const updatePatient = async (patient: any) => {
    return axiosInstance.put('/profile/patient/update', patient)
    .then((res) => res.data)
    .catch((err) => {throw err})

}
export {getPatient,updatePatient}