import "./Carousel.css"
import { useEffect } from "react"
import CardOne from "../CardOne/CardOne.jsx"

function Carousel({ defaultPokemons }) {
	//* EFECTO CARRUSEL - CÓDIGO JS
	useEffect(() => {
		//? Lo pongo en plural por si necesito seleccionar mas scrollers
		// Array of <div> elements
		const scrollers = document.querySelectorAll(".scroller")

		//? por si el usuario redujo las animaciones en su navegador
		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			addAnimation()
		}

		//? funcion que hara la animación
		function addAnimation() {
			// Each <div> element
			scrollers.forEach((scroller) => {
				scroller.setAttribute("data-animated", true)

				// <ul> element
				const scrollerInner = scroller.querySelector(".scroller__inner")
				// Array of <li> elements
				const scrollerContent = Array.from(scrollerInner.children)

				scrollerContent.forEach((item) => {
					const duplicatedItem = item.cloneNode(true)
					scrollerInner.appendChild(duplicatedItem)
				})
			})
		}
	}, [])

	return (
		<div className="scroller" data-direction="left" data-speed="slow">
			<ul className="cards-list scroller__inner">
				{defaultPokemons.map((pokemon) => (
					<li key={pokemon.id}>{<CardOne pokemon={pokemon} />}</li>
				))}
			</ul>
		</div>
	)
}

export default Carousel
