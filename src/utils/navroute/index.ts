type RouteItem = {
    path: string;
    title: string;
    name: string;
};
type ROUTE = () => RouteItem[];

export const routenave: ROUTE = () => [
    {
        path: '/panel',
        title: "Panel",
        name: 'panel'
    },
    {
        path: '/login',
        title: "Login",
        name: 'login'
    },
    {
        path: '/userlist',
        title: "UserList",
        name: 'userlist',
    },
]