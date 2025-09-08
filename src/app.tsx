import { Hero } from "./components/hero";
import { Nav } from "./components/nav";
import { Carousel } from "./components/carousel";
import { About } from "./components/about";
import styles from "./app.module.css";

export const App = () => {
  return (
    <main className={styles.container}>
      <Nav />
      <Hero />
      <Carousel />
      <About />
    </main>
  );
};
