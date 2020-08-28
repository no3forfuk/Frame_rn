import Login from "../pages/login"
import App from "../App"

const routes = [
    {
        path: "/login",
        component: Login,
        routes: []
    },
    {
        path: "/",
        component: App,
        exact: true,
        routes: []
    },
    {
        path: "*",
        component: Login,
        routes: []
    }
]
export default routes
