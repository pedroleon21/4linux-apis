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

api.interceptors.response.use(config => {
    try {
        console.log("config", config);
        return config;
    } catch (err) {
        delete localStorage.token;
        router.push({
            name: "login"
        });
    }
})

api.interceptors.response.use(
    config =>config,
    error => {
        router.push({
            name: "login"
        });
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