import {
	regexNombre,
	regexUrl,
	regexNumeroEntero,
	regexNumeroDecimal
} from "./regexp.js"

function validation(pokedata) {
	const errors = {}

	//* Nombre
	if (!pokedata.nombre) errors.nombre = "Debe ingresar un nombre"
	else {
		if (!regexNombre.test(pokedata.nombre))
			errors.nombre =
				"El nombre NO puede contener números, caracteres especiales y muchos espacios en blanco."
	}

	//* Imagen url
	if (!pokedata.imagen) errors.imagen = "Debe ingresar la URL de la imagen"
	else {
		if (!regexUrl.test(pokedata.imagen))
			errors.imagen = "Debe ser un formato válido de URL"
	}

	//* Vida
	const numeroVida = Number(pokedata.vida)
	if (!pokedata.vida) errors.vida = "Debe ingresar puntos de vida"
	else {
		if (!regexNumeroEntero.test(pokedata.vida))
			errors.vida = "Debe ser un número entero."
		if (numeroVida < 1 || numeroVida > 100)
			errors.vida = "Debe tener un minímo de 1 y un máximo de 100"
	}

	//* Ataque
	const numeroAtaque = Number(pokedata.ataque)
	if (!pokedata.ataque) errors.ataque = "Debe ingresar puntos de ataque"
	else {
		if (!regexNumeroEntero.test(pokedata.ataque))
			errors.ataque = "Debe ser un número entero."
		if (numeroAtaque < 1 || numeroAtaque > 100)
			errors.ataque = "Debe tener un minímo de 1 y un máximo de 100"
	}

	//* Defensa
	const numeroDefensa = Number(pokedata.defensa)
	if (!pokedata.defensa) errors.defensa = "Debe ingresar puntos de defensa"
	else {
		if (!regexNumeroEntero.test(pokedata.defensa))
			errors.defensa = "Debe ser un número entero."
		if (numeroDefensa < 1 || numeroDefensa > 100)
			errors.defensa = "Debe tener un minímo de 1 y un máximo de 100"
	}

	//* Velocidad (OPCIONAL)
	const numeroVelocidad = Number(pokedata.velocidad)
	if (pokedata.velocidad) {
		if (!regexNumeroEntero.test(pokedata.velocidad))
			errors.velocidad = "Debe ser un número entero."
		if (numeroVelocidad < 1 || numeroVelocidad > 100)
			errors.velocidad = "Debe tener un minímo de 1 o un máximo de 100"
	}

	//* Altura (OPCIONAL)
	const numeroAltura = Number(pokedata.altura)
	if (pokedata.altura) {
		if (
			!regexNumeroEntero.test(pokedata.altura) &&
			!regexNumeroDecimal.test(pokedata.altura)
		) {
			errors.altura = "Tiene que ser un número entero o decimal"
		}
		// equivalencia 1 pie = 0.3 metros
		// minimo de 1 metro = 3 pies
		// maximo de 2 metro = 7 pies
		if (numeroAltura < 3 || numeroAltura > 7) {
			errors.altura = "Debe tener un minímo de 3 pies o un máximo 7 pies"
		}
	}

	//* Peso (OPCIONAL)
	const numeroPeso = Number(pokedata.peso)
	if (pokedata.peso) {
		if (
			!regexNumeroEntero.test(pokedata.peso) &&
			!regexNumeroDecimal.test(pokedata.peso)
		) {
			errors.peso = "Tiene que ser un número entero o decimal"
		}
		// equivalencia 1 libra = 0.4 kilos
		// minimo de 2 libras = 1 kilo
		// máximo de 2205 libras = 1000 kilos
		if (numeroPeso < 2 || numeroPeso > 2205) {
			errors.peso = "Debe tener un minímo de 2 libras o un máximo 2205 libras"
		}
	}

	//* Tipos
	if (pokedata.Types.length < 1)
		errors.Types = "Debe seleccionar al menos 1 tipo de pokemon"

	return errors
}

export default validation
