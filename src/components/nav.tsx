import { ShortLogo } from "./logo";
import styles from "./nav.module.css";

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_logo}>
        <ShortLogo height={50} />
        <div className={styles.nav_name}>
          <span>Dan</span>
          <span>Foad</span>
        </div>
      </div>
      <ul className={styles.nav_links}>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="https://www.instagram.com/catatonic_dan/">Photography</a>
        </li>
        <li>
          <a href="https://linkedin.com/in/danfoad">Contact</a>
        </li>
      </ul>
      <div className={styles.nav_socials}>
        <a
          href="https://github.com/foad"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          <img src="/gh-logo.svg" alt="GitHub" height={20} width={20} />
        </a>
        <a
          href="https://linkedin.com/in/danfoad"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedin}
        >
          <img src="/ln-logo.png" alt="LinkedIn" height={19} width={19} />
        </a>
      </div>
    </nav>
  );
};
