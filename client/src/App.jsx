import { Routes, Route } from "react-router-dom"
import Home from "./Views/Home/Home.jsx"
import Landing from "./Views/Landing/Landing.jsx"
import Details from "./Views/Details/Details.jsx"
import FormPokemon from "./Views/FormPokemon/FormPokemon.jsx"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/home" element={<Home />}></Route>
				<Route path="/details/:id" element={<Details />}></Route>
				<Route path="/form" element={<FormPokemon />}></Route>
			</Routes>
		</>
	)
}

export default App
