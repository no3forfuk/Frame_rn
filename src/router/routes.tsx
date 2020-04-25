import Login from '../pages/login'
import Loading from '../pages/loading'
import App from '../App'
import React from "react";

interface route {
    path: string,
    component: React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined,
    routes: Array<{
        path: string;
        component: React.ReactElement,
    }>,
    exact?: boolean
}

const routes: Array<route> = [
    {
        path: "/login",
        component: Login,
        routes: []
    },
    {
        path: "/",
        component: App,
        exact: true,
        routes: [{
            path: "/loading",
            component: Loading,
        }]
    },
    {
        path: "*",
        component: Login,
        routes: []
    },
]
export default routes
