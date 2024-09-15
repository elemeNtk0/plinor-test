import React, { forwardRef } from "react";
import styles from "./input.module.sass";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className={styles.InputWrap}>
        <label htmlFor={rest.id} className={styles.Label}>
          {label}
        </label>
        <input ref={ref} id={rest.id} className={styles.input} {...rest} />

        {error && <p className={styles.ErrorMessage}>{error}</p>}
      </div>
    );
  }
);
