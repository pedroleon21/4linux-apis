import Vue from "vue";
import axios from "axios";
import router from "../router"
import verificaIsNullEmpyt from "../utils/utils"
let baseURL = process.env.VUE_APP_BASE_ROUTE_API;

console.log(process.env);


const api = axios.create({
    baseURL,
    withCredentials: true,
})


api.interceptors.response.use(
    config => config,
    error => {
        if (window.location.pathname.localeCompare("/login"))
            router.push({
                name: "login"
            });
            throw error;
    }
)

api.interceptors.request.use(config => {
    let jwtToken = JSON.parse(localStorage.getItem("token"));
    if (!verificaIsNullEmpyt(jwtToken))
        config.headers = { "Authorization": `Bearer ${jwtToken}` }
    return config;
});

api.auth = (login, password) => {
    return api.post(`${baseURL}/auth/login`, { login, password });
}

Vue.use({
    install(Vue) {
        Vue.prototype.$api = api;
    }
});

export default api;