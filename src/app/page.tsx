import { RandomisedPanel } from "./components/panel/randomised_panel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Dan Foad</h1>
        <div className={styles.grid}>
          <RandomisedPanel />
        </div>
      </main>
    </div>
  );
}
