import { FC, useState } from "react";
import { MdAdd, MdCreate } from "react-icons/md";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Modal } from "~/shared/ui/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./AddCard.module.sass";
import { ValidationSchema, ValidationType } from "./validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardSize, addCard } from "~/entities/card";

export const AddCard: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationType>({
    resolver: zodResolver(ValidationSchema),
  });

  const onSubmit: SubmitHandler<ValidationType> = ({ size, ...form }) => {
    addCard({
      size: Number(size) as CardSize,
      ...form,
    });
    setModalOpen(false);
  };

  return (
    <>
      <Button left={<MdAdd />} onClick={() => setModalOpen(true)}>
        Добавить карточку
      </Button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Создание карточки"
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
          Создать
        </Button>
      </Modal>
    </>
  );
};
