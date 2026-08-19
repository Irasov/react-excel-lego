import React from "react";
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className={styles.body}>
          FOOTER
        </div>
      </div>
    </footer>
  )
}

export default Footer;