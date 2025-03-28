import { generateText } from "@/app/utils/text_gen";
import styles from "./visual.module.css";

export const Squares = () => {
  const generateSquares = () => {
    const squares = [];
    for (let i = 0; i < 32 * 8; i++) {
      const opacity = Math.random();
      squares.push(
        <div key={i} className={styles.square} style={{ opacity }} />
      );
    }
    return squares;
  };

  return (
    <div className={styles.squares}>
      <div className={styles.squares_container}>{generateSquares()}</div>
      <div className={styles.squares_info}>
        <span className={styles.squares_name}>
          {generateText("{{component}} System S{{number}}")}
        </span>
        <span className={styles.squares_status}>Active</span>
      </div>
    </div>
  );
};
