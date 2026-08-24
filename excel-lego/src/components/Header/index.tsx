import React from "react";
import styles from "./Header.module.scss";
import ImageSequenceLoop from "../../utils/ImageSequenceLoop";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className={styles.body}>
          <div className={styles.logo}>
            <a className={styles.logo_link} href="/">
              <ImageSequenceLoop
                basePath="../../../public/images/logo/"
                largeFormat="png"
                totalFrames={36}
                pxPerFrame={100}
                loop={false}
                className={styles["image-sequence"]}
              />
            </a>
            <h1 className={styles.title}>Wherea</h1> 
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;