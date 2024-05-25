import axios from "axios";
import { useNavigate } from "react-router"
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    //request interceptor to add authorization header for every secure call of api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request interrupt by interceptors', token);
        config.headers.authorization = `bearer ${token}`
        return config;
    }, function (error) {

        return Promise.reject(error);
    });
    // intercepts 401 and 403  status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }), async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptors', status);
        if (status === 401 | status === 403) {

            await logout();
            navigate('/login')
        }
        return Promise.reject(error);
    }
    return axiosSecure;
};

export default useAxiosSecure;

