import React, { CSSProperties, PropsWithChildren } from "react";
import styles from "./card.module.sass";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardSize } from "../types";
import { MdMenu } from "react-icons/md";

interface ICardProps extends PropsWithChildren {
  id: string;
  title: string;
  description: string;
  size: CardSize;
}

export const Card: React.FC<ICardProps> = ({
  id,
  title,
  description,
  children,
  size,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumn: `span ${size}`,
  };

  return (
    <div ref={setNodeRef} className={styles.container}>
      <div className={styles.card} style={style}>
        <div className={styles.card__handle} {...attributes} {...listeners}>
          <MdMenu />
        </div>
        <div className={styles.card__body}>
          <div>
            <h2 className={styles.card__title}>{title}</h2>
            <p>{description}</p>
          </div>

          <div className={styles.card__actions}>{children}</div>
        </div>
      </div>
    </div>
  );
};
