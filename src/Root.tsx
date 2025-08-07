import { BrowserRouter, Route, Routes } from 'react-router'
import { Box, ThemeProvider } from '@mui/material'
import { configureRoute, DASHBOARD_NESTED_ROUTES, MAIN_ROUTES } from './config/router.config'
import { theme } from './utils/theme.utils'
import ErrorBoundary from './ErrorBoundary'
import { Navigation } from './components'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './store/AuthProvider'
import UserList from './views/UserList/UserList'
import Panel from './views/Panel/Panel'
import { ProtectedRoute } from './config/ProtectedRoute'
import DashboardLayout from './layout/DashboardLayout'
import Products from './views/NavigatorInfo/NavigatorInfo'


export default function Root() {
	return (
		<main>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<AuthProvider>
						<ErrorBoundary>
							<Navigation />
						</ErrorBoundary>

						{/* Recommend to use  ErrorBoundary to the specific section*/}
						<ErrorBoundary>
							<Box component="section" minHeight="60vh">
								<Routes>
										{configureRoute(MAIN_ROUTES)}
									<Route element={<ProtectedRoute />}>
										<Route path='/panel' element={<Panel />} />
										<Route path='/userlist' element={<UserList />} />
										<Route path='/products' element={<Products />} />
										{/* dashboard nested routes */}
										<Route path='dashboard' element={<DashboardLayout />}>
											{configureRoute(DASHBOARD_NESTED_ROUTES)}
										</Route>
									</Route>
								
								</Routes>
							</Box>
						</ErrorBoundary>


						<ErrorBoundary>
							<Footer />
						</ErrorBoundary>
					</AuthProvider>

				</ThemeProvider>
			</BrowserRouter>
		</main>
	)
}

