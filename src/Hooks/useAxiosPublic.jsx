import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-server-iota-fawn.vercel.app'
})
export const useAxiosPublic = () => {
    return axiosPublic;
};



