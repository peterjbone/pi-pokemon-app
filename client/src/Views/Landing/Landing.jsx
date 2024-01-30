import React from "react"
import "./Landing.css"
import { Link } from "react-router-dom"

function Landing() {
	return (
		<div className="landing-container">
			<h1>Pokemon app</h1>
			<p>
				Bienvenido a la aplicación pokemon, aquí puedes elegir tus pokemons favoritos, haz clic en
				el de botón abajo para comenzar a coleccionarlos.
			</p>
			<img src="../../../public/pokemons-together.png" alt="pikachu" className="pikachu-hero" />
			<Link to="/home" className="action-btn-link">
				<button className="action-btn">Empezar</button>
			</Link>
			<p className="info-text">
				Puedes escoger entre{" "}
				<a href="https://pokeapi.co/api/v2/pokemon" target="_blank" className="link-api">
					1302 pokemons
				</a>
			</p>
		</div>
	)
}

export default Landing
