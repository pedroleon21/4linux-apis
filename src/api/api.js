import Vue from "vue";
import axios from "axios";
import router from "../router"

let baseURL = process.env.VUE_APP_BASE_ROUTE_API;

console.log(process.env);


const api = axios.create({
    baseURL,
    withCredentials: true,
})

api.interceptors.request.use(config => {
    try {
        let jwtToken = JSON.parse(localStorage.getItem("token"));
        config.headers = { "Authorization": `Bearer ${jwtToken}`}
        return config;
    } catch (err) {
        delete localStorage.token;
        router.push({
            name: "Login"
        });
        throw err;
    };
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