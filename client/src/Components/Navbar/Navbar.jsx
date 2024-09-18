import styles from "./Navbar.module.css";
import React from "react";
import DarkMode from "../DarkMode/DarkMode.jsx";

const Navbar = () => {
	//prettier-ignore

	//*********************************** COMPONENT NAVBAR
	return (
    <div className={styles.navbar}>
      {/*logo*/}
      <h1>Poke Data</h1>
      {/*Dark mode*/}
      <DarkMode/>
    </div>
  );
};

export default Navbar;
