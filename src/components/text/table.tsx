import { generateText } from "../../utils/text_gen";
import styles from "./text.module.css";

export const Table = () => {
  const getRandomLetter = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);

  const randomComponent = generateText("{{component}}");
  const randomLetter = getRandomLetter();
  const randomUnits = getRandomLetter().toLowerCase();

  const generateTable = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(
        <div key={i} className={`${styles.row}`}>
          <div className={styles.cell}>
            {generateText(`${randomComponent} ${randomLetter}0{{number}}`)}
            <span className={styles.subtext}>
              {generateText("LOC N0{{number}} 0{{number}}")}
            </span>
          </div>
          <div className={styles.cell}>
            {Math.random() < 0.5 ? (
              <span className={styles.active} />
            ) : (
              <span className={styles.inactive} />
            )}
          </div>
          <div className={styles.cell}>
            {generateText(`0{{number}}${randomUnits}`)}
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.header}`}>
        <div className={styles.cell}>{`${randomComponent} Component`}</div>
        <div className={styles.cell}>Status</div>
        <div className={styles.cell}>Value</div>
      </div>
      {generateTable()}
    </div>
  );
};
