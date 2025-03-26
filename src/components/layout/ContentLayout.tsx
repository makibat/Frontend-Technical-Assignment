import { ReactNode } from "react";
import styles from "./content-layout.module.scss";

type BaseLayoutProps = {
  children: ReactNode;
};

export function ContentLayout({ children }: BaseLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
