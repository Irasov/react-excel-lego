import React from "react";
import styles from "./Header.module.scss";
import ImageSequenceLoop from "../../utils/ImageSequenceLoop";
import { Link, useLocation } from "react-router-dom";
const MOBILE_WIDTH = 999.98;

const Header: React.FC = () => {
  const location = useLocation();
  const [active, setActive] = React.useState(false);

  const iconClick = () => {
    setActive((prev) => !prev);
  }

  React.useEffect(() => {
    document.body.classList.toggle("_lock", active);
    return () => {
      document.body.classList.remove("_lock");
    }
  }, [active]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_WIDTH) setActive(false);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  

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
          <nav className={`${styles.nav} ${active ? styles.active : ''}`}>
            <div className={styles.menu}>
              <Link to="/" className={`${styles.menu__item} ${ location.pathname == '/' ? styles.menu__item_active : ''}`} onClick={active ? iconClick : undefined}>Home</Link>
              <Link to="#" className={`${styles.menu__item} ${ location.pathname == '/series' ? styles.menu__item_active : ''}`} onClick={active ? iconClick : undefined}>Series</Link>
              <Link to="#" className={`${styles.menu__item} ${ location.pathname == '/instructions' ? styles.menu__item_active : ''}`} onClick={active ? iconClick : undefined}>Instructions</Link>
              <Link to="#" className={`${styles.menu__item} ${ location.pathname == '/media' ? styles.menu__item_active : ''}`} onClick={active ? iconClick : undefined}>Media</Link>
              <Link to="#" className={`${styles.menu__item} ${ location.pathname == '/contacts' ? styles.menu__item_active : ''}`} onClick={active ? iconClick : undefined}>Contacts</Link>
            </div>
          </nav>
          <div className={`${styles.icon} ${active ? styles.active : ''}`} onClick={iconClick}></div>
        </div>
      </div>
    </header>
  )
}

export default Header;