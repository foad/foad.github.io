import { useState } from "react";
import { Menu } from "lucide-react";
import { ShortLogo } from "./logo";
import styles from "./nav.module.css";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.nav_spacer} />
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
            <a href="#hero">About</a>
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
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </div>
        {isOpen && (
          <ul className={styles.mobile_menu}>
            <li>
              <a href="#hero" onClick={() => setIsOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/catatonic_dan/"
                onClick={() => setIsOpen(false)}
              >
                Photography
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/danfoad"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
            <li className={styles.mobile_spacer} />
            <li className={styles.mobile_socials}>
              <a
                href="https://github.com/foad"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.github}
                onClick={() => setIsOpen(false)}
              >
                <img src="/gh-logo.svg" alt="GitHub" height={20} width={20} />
              </a>
              <a
                href="https://linkedin.com/in/danfoad"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedin}
                onClick={() => setIsOpen(false)}
              >
                <img src="/ln-logo.png" alt="LinkedIn" height={19} width={19} />
              </a>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};
