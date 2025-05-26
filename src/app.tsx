import { RandomisedPanel } from "./components/panel/randomised_panel";
import styles from "./app.module.css";

export const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidePanels}>
        <RandomisedPanel />
      </div>
      <main className={styles.main}>
        <div className={styles.block}>
          <h1 className={styles.title}>Dan Foad</h1>
          <p>hello :)</p>
        </div>
      </main>
    </div>
  );
};
