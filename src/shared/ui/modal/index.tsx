import React, { PropsWithChildren } from "react";
import { Dialog } from "@headlessui/react";
import cn from "classnames";
import styles from "./modal.module.sass";

export interface IModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => unknown;
  title?: string;
  className?: string;
}

export const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className={styles.dialog}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.container}>
        <Dialog.Panel className={cn(styles.panel, className)}>
          {title && (
            <Dialog.Title className={styles.Title}>{title}</Dialog.Title>
          )}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
