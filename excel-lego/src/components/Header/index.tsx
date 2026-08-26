import React from "react";
import styles from "./Header.module.scss";
import ImageSequenceLoop from "../../utils/ImageSequenceLoop";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className={styles.body}>
          <div className={styles.logo}>
            <Link className={styles.logo__link} to="/">
            <div className={styles.logo__images} >
              <ImageSequenceLoop
                basePath="../../../public/images/logo/"
                largeFormat="png"
                totalFrames={36}
                pxPerFrame={100}
                loop={false}
                className={styles["image-sequence"]}
              />
            </div>
            <h2 className={styles.title}>Brick & Glow</h2> 
            </Link>
          </div>
          <nav className={styles.nav}>
            <div className={styles.menu}>
              <Link to="/" className={`${styles.menu__item} ${ location.pathname == '/' ? styles.menu__item_active : ''}`}>Home</Link>
              <Link to="#" className={`${styles.menu__item} ${ location.pathname == '/series' ? styles.menu__item_active : ''}`}>Series</Link>
              <Link to="#" className={`${styles.menu__item} ${ location.pathname == '/instructions' ? styles.menu__item_active : ''}`}>Instructions</Link>
              <Link to="#" className={`${styles.menu__item} ${ location.pathname == '/media' ? styles.menu__item_active : ''}`}>Media</Link>
              <Link to="#" className={`${styles.menu__item} ${ location.pathname == '/contacts' ? styles.menu__item_active : ''}`}>Contacts</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;