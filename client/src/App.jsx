import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Views/Home/Home.jsx"
import Form from "./Views/Form/Form.jsx"
import Navbar from "./Components/Navbar/Navbar.jsx"
import Details from "./Views/Details/Details.jsx"
import Landing from "./Views/Landing/Landing.jsx"

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" Component={Landing}></Route>
				<Route path="/home" Component={Home}></Route>
				<Route path="/form" Component={Form}></Route>
				<Route path="/details" Component={Details}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
