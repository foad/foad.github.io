import { Logo } from "./logo";
import styles from "./hero.module.css";

export const Hero = () => {
  return (
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
  );
};
