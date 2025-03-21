import styles from "./panel.module.css";

type PanelProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const Panel = ({ children }: PanelProps) => {
  return <div className={styles.panel}>{children}</div>;
};
