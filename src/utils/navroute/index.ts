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
        path: '/userlist',
        title: 'UserList',
        name: 'userlist',
    },
    {
        path: '/posts',
        title: 'Posts',
        name: 'posts',
    }
]