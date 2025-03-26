import React, { useId } from "react";
import styles from "./input-field.module.scss";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, ...props }, ref) => {
    const id = useId();

    return (
      <div className={styles.container}>
        <label htmlFor={id}>{label}</label>
        <input id={id} ref={ref} {...props} />
      </div>
    );
  },
);

InputField.displayName = "InputField";
