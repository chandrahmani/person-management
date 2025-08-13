import { Route } from "react-router";
import { ROUTE } from "../types";
import About from "../views/About";
import { Home, Settings } from "../views/Dashboard";
import Landing from "../views/Landing/Landing";
import Contact from "../views/Contact";
// import Profile from "../views/Dashboard/Profile";
import Login from "@/views/Login/Login";
import Products from "@/views/NavigatorInfo/NavigatorInfo";
// import Products from "@/views/Products/Products";



export const configureRoute = (routes: ROUTE[]) => {
	return routes.map((route: ROUTE) =>
		<Route key={route.name}
			// add index prop conditionally 
			{...(route.index && { index: true })}
			path={route.path}
			element={route.element} />)
}

// main routes
export const MAIN_ROUTES: ROUTE[] = [
	{
		path: '/',
		title: "Home",
		index: true,
		name: 'landing',
		element: <Landing />,
	},
	{
		path: '/contact',
		title: "Contact Us",
		name: 'contact',
		element: <Contact />,
	},
		{
		path: '/about',
		title: "About Us",
		name: 'about',
		element: <About />,
	},
		{
		path: '/products',
		title: "Products",
		name: 'products',
		element: <Products />,
	},
	{
		path: "/login",
		title:"Login",
		name:"login",
		element:<Login />
	}
]

// sub route - dashboard/
export const DASHBOARD_NESTED_ROUTES: ROUTE[] = [
	{
		path: '/dashboard',
		index: true,
		title: "Dashboard",
		name: 'dashboard',
		element: <Home />,
	},
	{
		path: 'settings',
		title: "Settings",
		name: 'settings',
		element: <Settings />,
	},
	// {
	// 	path: 'profile',
	// 	title: "My Profile",
	// 	name: 'profile',
	// 	element: <Profile />
	// }
]
