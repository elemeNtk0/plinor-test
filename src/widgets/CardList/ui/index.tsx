import { FC } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import styles from "./CardList.module.sass";
import { Card } from "~/entities/card/ui";
import { useUnit } from "effector-react";
import { $cards, moveCards } from "~/entities/card";
import { EditCard } from "~/features/EditCard";
import { DeleteCard } from "~/features/DeleteCard";

export const CardList: FC = () => {
  const cards = useUnit($cards);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    moveCards(event);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        <div className={styles.list}>
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              size={card.size}
            >
              <>
                <EditCard id={card.id} />
                <DeleteCard id={card.id} />
              </>
            </Card>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
