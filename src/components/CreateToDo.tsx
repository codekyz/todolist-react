import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 16px;
  flex-grow: 1;
  padding: 5px 10px;
  margin: 5px;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 3px;
  &:focus {
    outline: none;
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

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = (data: IForm) => {
    setToDos((prevToDos) => [
      { id: Date.now(), text: data.toDo, category },
      ...prevToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: "Please write a to do",
        })}
        placeholder="write a to do"
      />
      <Button>Add To Do</Button>
    </Form>
  );
};

export default CreateToDo;
