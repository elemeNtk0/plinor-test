import React, { ReactNode } from "react";
import cn from 'classnames';
import styles from './button.module.sass';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  left?: ReactNode;
}

export const Button: React.FC<IButtonProps> = ({
  left,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, props.className)}
      {...props}
    >
      {left}
      {children}
    </button>
  );
};
