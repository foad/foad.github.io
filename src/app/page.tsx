import { Title } from "./components/title";
import { Panel } from "./components/panel";
import { Contour, Sunburst, BarGraphs, RadarGraph } from "./components/visual";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Dan Foad</h1>
        <div className={styles.grid}>
          <Panel>
            <Title variant="main">Power Units</Title>
            <Contour />
            <Title variant="secondary" subtitle="active">
              Unit 01
            </Title>
            <Sunburst />
            <BarGraphs />
            <RadarGraph />
          </Panel>
        </div>
      </main>
    </div>
  );
}
