import styles from "./Navbar.module.css";

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import DarkMode from "../DarkMode/DarkMode.jsx";
import srcPokemonBall from "../../../public/pokebola.png";

const Navbar = () => {
	//prettier-ignore
	return (
    <div className={styles.navbar}>
      {/*link to pokemon form*/}
      <div className={styles.formLink}>
        <Link to="/form">
          <img src={srcPokemonBall} alt="pokemon ball" />
        </Link>
        <FaArrowUp/>
        <p>Create your pokemon</p>
      </div>
      {/*logo*/}
      <h1>Pokemon Stats</h1>
      {/*Dark mode*/}
      <DarkMode/>
    </div>
  );
};

export default Navbar;
