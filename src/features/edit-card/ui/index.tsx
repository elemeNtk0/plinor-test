import React, { useState } from "react";
import { MdCreate, MdEdit } from "react-icons/md";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Modal } from "~/shared/ui/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./edit-card.module.sass";
import { ValidationSchema, ValidationType } from "./validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { $cards, CardSize, updateCard } from "~/entities/card";
import { useUnit } from "effector-react";

interface IEditCardProps {
  id: string;
}

export const EditCard: React.FC<IEditCardProps> = ({ id }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const cards = useUnit($cards);
  const selectedCard = cards.find((card) => card.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationType>({
    resolver: zodResolver(ValidationSchema),
    values: {
      title: selectedCard?.title ?? "",
      description: selectedCard?.description ?? "",
      size: selectedCard?.size ?? 3,
    },
  });

  const onSubmit: SubmitHandler<ValidationType> = ({ size, ...form }) => {
    updateCard({
      id,
      size: Number(size) as CardSize,
      ...form,
    });
    setModalOpen(false);
  };

  return (
    <>
      <Button left={<MdEdit />} onClick={() => setModalOpen(true)}>
        Изменить карточку
      </Button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Изменить карточку"
        className={styles.modal}
      >
        <Input
          label="Название"
          id="cardTitle"
          required
          error={errors?.title?.message}
          {...register("title")}
        />

        <Input
          label="Описание"
          id="cardDescription"
          required
          error={errors?.description?.message}
          {...register("description")}
        />

        <Input
          label="Размер колонки"
          placeholder="от 3 до 12"
          type="number"
          min={3}
          max={12}
          id="cardSize"
          error={errors?.size?.message}
          {...register("size")}
        />
        <Button left={<MdCreate />} onClick={handleSubmit(onSubmit)}>
          Изменить
        </Button>
      </Modal>
    </>
  );
};
