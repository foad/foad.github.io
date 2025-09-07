import styles from "./about.module.css";
import { Timeline } from "./timeline";

export const About = () => {
  return (
    <div className={styles.about_section}>
      <Timeline />
    </div>
  );
};
