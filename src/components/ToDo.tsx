import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categorySelector, IToDo, toDoState } from "../atoms";

const List = styled.li`
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 3px 5px;
  margin-top: 10px;
  span {
    margin-right: auto;
  }
`;

const Button = styled.button`
  border: none;
  padding: 3px 5px;
  margin: 0px 3px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const ToDo = ({ text, category, id }: IToDo) => {
  const allCategories = useRecoilValue(categorySelector);
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { id, text, category: name as Categories };
      const newToDos = [
        ...prevToDos.slice(0, targetIndex),
        newToDo,
        ...prevToDos.slice(targetIndex + 1),
      ];

      return newToDos;
    });
  };

  const onRemove = () => {
    setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <List>
      <span>{text}</span>
      {allCategories.map(
        (categoryItem) =>
          category !== categoryItem && (
            <Button key={categoryItem} name={categoryItem} onClick={onClick}>
              {categoryItem}
            </Button>
          )
      )}
      <Button onClick={onRemove}>&#10006;</Button>
    </List>
  );
};

export default ToDo;
