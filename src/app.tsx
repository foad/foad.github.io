import { Logo } from "./components/logo";
import styles from "./app.module.css";

export const App = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.block}>
          <Logo />
        </div>
      </main>
    </div>
  );
};
