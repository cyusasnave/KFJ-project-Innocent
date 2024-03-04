import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slide, scale } from "../../anim";
import styles from "./style.module.scss";

interface IndexProps {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: React.Dispatch<React.SetStateAction<string>>;
}

const Index: React.FC<IndexProps> = ({
  data,
  isActive,
  setSelectedIndicator,
}) => {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      ></motion.div>
      <Link to={href}>{title}</Link>
    </motion.div>
  );
};

export default Index;
