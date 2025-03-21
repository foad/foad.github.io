import { Title } from "./components/title";
import { Panel } from "./components/panel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Dan Foad</h1>
        <Panel>
          <Title variant="main">Power Units</Title>
          <Title variant="secondary" subtitle="active">
            Unit 01
          </Title>
        </Panel>
      </main>
    </div>
  );
}
