import { RandomisedPanel } from "./components/panel/randomised_panel";
import { Logo } from "./components/logo";
import styles from "./app.module.css";

export const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidePanels}>
        <RandomisedPanel />
      </div>
      <main className={styles.main}>
        <div className={styles.block}>
          <Logo />
          <h1 className={styles.title}>
            personal site and portfolio of{" "}
            <span className={styles.name}>dan foad</span>
          </h1>
        </div>
      </main>
    </div>
  );
};
