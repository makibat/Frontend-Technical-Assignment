import React from "react";
import styles from "./button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <button
      ref={ref}
      className={styles.button}
      type={props.type === "submit" ? "submit" : "button"}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";
