import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  categoriesState,
  isDarkState,
  toDoSelector,
  toDoState,
} from "../atoms";
import Category from "./Category";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.main`
  width: 60vw;
  height: 100%;
  margin: 20px 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  font-size: 32px;
  font-weight: 800;
  border-bottom: 5px solid ${(props) => props.theme.hoverColor};
  margin: 20px 0px;
  button {
    font-size: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin-left: auto;
  }
`;

const LOCAL_TODO_KEY = "todolist";
const LOCAL_CATE_KEY = "category";

const ToDoList = () => {
  const selectToDos = useRecoilValue(toDoSelector);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setCategories = useSetRecoilState(categoriesState);
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  useEffect(() => {
    const savedToDos = localStorage.getItem(LOCAL_TODO_KEY);
    const savedCategories = localStorage.getItem(LOCAL_CATE_KEY);
    if (savedToDos) {
      setToDos(JSON.parse(savedToDos));
    }
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_TODO_KEY, JSON.stringify(toDos));
  }, [toDos]);

  const handleModeToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Container>
      <Title>
        Things To Do
        <button onClick={handleModeToggle}>{isDark ? "🌞" : "🌙"}</button>
      </Title>

      <CreateCategory />
      <CreateToDo />
      <Category />
      {selectToDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
};

export default ToDoList;
