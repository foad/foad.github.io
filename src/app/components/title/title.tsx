import styles from "./title.module.css";

type TitleProps = {
  variant: "main" | "secondary";
  subtitle?: string;
  children: React.ReactNode;
};

export const Title = ({ variant, subtitle, children }: TitleProps) => {
  if (variant === "main") {
    return <h1 className={styles.main_title}>{children}</h1>;
  }
  if (variant === "secondary") {
    return (
      <h2 className={styles.secondary_title}>
        {children}
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </h2>
    );
  }
  return <h1 className={styles.title}>{children}</h1>;
};
