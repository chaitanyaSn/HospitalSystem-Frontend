import axiosInstance from "../Interceptor/AxiosInterceptor"

const registerUser = async (user: any) => {
    return axiosInstance.post("/users/register", user)
    .then((res) => res.data)
    .catch((err) => {throw err})
}

const loginUser = async (user: any) => {
    return axiosInstance.post("/users/login", user)
    .then((res) => res.data)
    .catch((err) => {throw err})
}

export {registerUser,loginUser}