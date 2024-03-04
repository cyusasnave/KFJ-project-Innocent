import React, { useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import Link from "./Link";
import { menuSlide } from "../anim";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Blogs",
    href: "/work",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

const Index: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<string>(
    window.location.pathname
  );

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`z-50 ${styles.menu}`}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(window.location.pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Menu</p>
          </div>
          {navItems.map((data, index) => (
            <Link
              key={data.href}
              data={{ ...data, index }}
              isActive={selectedIndicator === data.href}
              setSelectedIndicator={setSelectedIndicator}
            ></Link>
          ))}
        </div>
        <div className={styles.footer}>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          {/* <a href="#">LinkedIn</a> */}
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
