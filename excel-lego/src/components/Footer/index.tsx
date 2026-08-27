import React from "react";
import styles from './Footer.module.scss';
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className={styles.body}>
          <Link to="/" className={styles.link}>
            <h2 className={styles.title}>Brick & Glow</h2>
          </Link>
          <span className={styles.text}>©2026 Brick & Glow</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;