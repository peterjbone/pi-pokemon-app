import { Link } from "react-router-dom"
import "./Paginado.css"
import { useLocation } from "react-router-dom"

function Paginado() {
	const path = useLocation().pathname

	return (
		<div className="paginado">
			<Link to="/home">
				<div className={path === "/home" ? "active" : null}>
					<p>1</p>
				</div>
			</Link>
			<Link to="/home/page/2">
				<div className={path.includes("/home/page/2") ? "active" : null}>
					<p>2</p>
				</div>
			</Link>
			<Link to="/home/page/3">
				<div className={path.includes("/home/page/3") ? "active" : null}>
					<p>3</p>
				</div>
			</Link>
			<Link to="/home/page/4">
				<div className={path.includes("/home/page/4") ? "active" : null}>
					<p>4</p>
				</div>
			</Link>
			<Link to="/home/page/5">
				<div className={path.includes("/home/page/5") ? "active" : null}>
					<p>5</p>
				</div>
			</Link>
		</div>
	)
}

export default Paginado
