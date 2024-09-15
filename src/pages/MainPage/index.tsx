import { FC } from "react";
import { AddCard } from "~/features/AddCard";
import { CardList } from "~/widgets/CardList";

import styles from "./MainPage.module.sass";

export const MainPage: FC = () => {
  return (
    <div className={styles.page}>
      <AddCard />
      <CardList />
    </div>
  );
};
