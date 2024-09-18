import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Home.jsx";
import Details from "./Views/Details/Details.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/details/:name" element={<Details />}></Route>
			</Routes>
		</>
	);
}

export default App;
