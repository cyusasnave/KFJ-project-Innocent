"use client";
import { AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import Nav from "../Header/Nav"

interface WindowSize {
  width: number;
}

export default function Home() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
  });
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const enableBurgerMenu = (): boolean => {
    return windowSize.width <= 965; // Enable burger menu for iPad and mobile screens (less than or equal to 768px)
  };


  return (
    <>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={`${enableBurgerMenu() ? styles.button : ""} ${
          isActive ? styles.burgerActive : ""
        }`}
      >
        <div
          className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}
        ></div>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
