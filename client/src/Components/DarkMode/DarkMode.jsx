import React, { useEffect, useState } from "react"
import Sun from "./Sun.svg?react"
import Moon from "./Moon.svg?react"
import "./DarkMode.css"

const DarkMode = () => {
	//* estado para controlar el checked del toggle
	const [isDark, setIsDark] = useState(false)

	function setDarkMode() {
		document.querySelector("body").setAttribute("data-theme", "dark")
		localStorage.setItem("selected-theme", "dark")
		setIsDark(true)
	}
	function setLightMode() {
		document.querySelector("body").setAttribute("data-theme", "light")
		localStorage.setItem("selected-theme", "light")
		setIsDark(false)
	}
	function toggleTheme(e) {
		if (e.target.checked) setDarkMode()
		else setLightMode()
	}

	//* Para que la página recuerde el tema
	useEffect(() => {
		if (localStorage.getItem("selected-theme") === "light") {
			setLightMode()
		} else {
			setDarkMode()
		}
	}, [])

	return (
		<div className="dark_mode">
			<input
				className="dark_mode_input"
				type="checkbox"
				id="darkmode-toggle"
				checked={isDark}
				onChange={toggleTheme}
			/>
			<label className="dark_mode_label" for="darkmode-toggle">
				<Sun />
				<Moon />
			</label>
		</div>
	)
}

export default DarkMode
