import React from "react";
import styles from "./display-field.module.scss";

interface DisplayFieldProps {
  label: string;
  children: React.ReactNode;
}

export function DisplayField({ label, children }: DisplayFieldProps) {
  return (
    <div className={styles.container}>
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
}
