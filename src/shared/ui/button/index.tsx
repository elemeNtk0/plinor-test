import { ReactNode, FC } from "react";
import cn from "classnames";
import styles from "./button.module.sass";

interface IButtonPropsType extends React.HTMLAttributes<HTMLButtonElement> {
  left?: ReactNode;
}

export const Button: FC<IButtonPropsType> = ({ left, children, ...props }) => {
  return (
    <button className={cn(styles.button, props.className)} {...props}>
      {left}
      {children}
    </button>
  );
};
