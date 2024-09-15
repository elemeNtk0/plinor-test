import { FC } from 'react'
import { MdDelete } from "react-icons/md";
import { deleteCard } from "~/entities/card";
import { Button } from "~/shared/ui/button";

interface IDeleteCardPropsType {
  id: string;
}

export const DeleteCard: FC<IDeleteCardPropsType> = ({
  id
}) => {
  const onDelete = () => {
    deleteCard(id);
  };

  return (
    <Button
      left={<MdDelete />}
      onClick={onDelete}  
    >
      Удалить
    </Button>
  );
};
