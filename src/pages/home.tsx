import { Hero } from "../components/hero";
import { Nav } from "../components/nav";
import { Favourites } from "../components/favourites/favourites";
import { About } from "../components/about";
import styles from "../app.module.css";

export const Home = () => {
  return (
    <div className={styles.page}>
      <header>
        <Nav />
      </header>
      <main className={styles.main}>
        <Hero />
        <Favourites />
        <About />
      </main>
    </div>
  );
};
