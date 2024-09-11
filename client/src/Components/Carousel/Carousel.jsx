import "./Carousel.css";
import { useEffect } from "react";
//import CardOne from "../CardOne/CardOne.jsx";

function Carousel({ pokemons }) {
	//* EFECTO CARRUSEL - CÓDIGO JS
	useEffect(() => {
		//? Lo pongo en plural por si necesito seleccionar mas scrollers
		// Array of <div> elements
		const scrollers = document.querySelectorAll(".scroller");

		//? por si el usuario redujo las animaciones en su navegador
		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			addAnimation();
		}

		//? funcion que hara la animación
		function addAnimation() {
			// Each <div> element
			scrollers.forEach((scroller) => {
				scroller.setAttribute("data-animated", true);

				// <ul> element
				const scrollerInner = scroller.querySelector(".scroller__inner");
				// Array of <li> elements
				const scrollerContent = Array.from(scrollerInner.children);

				scrollerContent.forEach((item) => {
					const duplicatedItem = item.cloneNode(true);
					scrollerInner.appendChild(duplicatedItem);
				});
			});
		}
	}, []);

	//********* COMPONENTE CARRUSEL
	return (
		<div className="scroller" data-direction="left" data-speed="slow">
			<h2 className="subtitulo">Algunos pokemones de primera generación:</h2>
			<ul className="cards-list scroller__inner">
				{pokemons.map((pokemon) => (
					<li key={pokemon.id}>{/*<CardOne pokemon={pokemon} />*/}</li>
				))}
			</ul>
		</div>
	);
}

export default Carousel;
