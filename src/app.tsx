import { Logo, ShortLogo } from "./components/logo";
import styles from "./app.module.css";

export const App = () => {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
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
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Photography</a>
            </li>
            <li>
              <a href="#">Contact</a>
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
        <div className={styles.hero_content}>
          <div className={styles.hero_splash}>
            <div className={styles.splash_image}>
              <img src="/profile_transparent.png" alt="Dan Foad Headshot" />
            </div>
            <div className={styles.logo_container}>
              <Logo width={350} />
            </div>
          </div>
          <div className={styles.hero_text}>
            <h1 className={styles.title}>Dan Foad</h1>
            <p className={styles.subtitle}>
              <strong>Lead Developer</strong> at{" "}
              <strong>Cambridge University Press & Assessment</strong>
            </p>
            <p className={styles.subtitle}>
              <strong>MSc Student</strong> at the{" "}
              <strong>University of Bath</strong>, studying{" "}
              <strong>Artificial Intelligence</strong>
            </p>
            <p className={styles.subtitle}>
              (Very) Amateur <strong>Photographer</strong>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
