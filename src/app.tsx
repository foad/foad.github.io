import { Hero } from "./components/hero";
import { Nav } from "./components/nav";
import { About } from "./components/about";
import styles from "./app.module.css";

export const App = () => {
  return (
    <main className={styles.container}>
      <Nav />
      <Hero />
      <About />
    </main>
  );
};
