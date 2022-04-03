import Vue from "vue";
import Router from "vue-router";
import Login from "./view/Login"
import Categories from "./view/Categories"

//views
import NotFount from "./view/NotFount"
import Main from "./view/Main"

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            name: "categories",
            component: Categories,
        }
    ]
});

export default router;