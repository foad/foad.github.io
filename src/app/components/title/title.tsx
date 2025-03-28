import styles from "./title.module.css";

type TitleProps = {
  variant: string;
  subtitle?: string;
  children: React.ReactNode;
};

export const Title = ({ variant, subtitle, children }: TitleProps) => {
  switch (variant) {
    case "main":
      return (
        <h1 className={`${styles.main_title} ${styles.title}`}>{children}</h1>
      );
    case "secondary":
      return (
        <h2 className={`${styles.secondary_title} ${styles.title}`}>
          {children}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </h2>
      );
    case "tertiary":
      return (
        <h3 className={`${styles.tertiary_title} ${styles.title}`}>
          {children}
        </h3>
      );
    default:
      return <h1 className={styles.title}>{children}</h1>;
  }
};
