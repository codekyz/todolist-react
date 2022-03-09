import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState } from "../atoms";

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
  category: string;
}
const LOCAL_CATE_KEY = "category";

const CreateCategory = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    setCategories([data.category, ...categories]);
    localStorage.setItem(
      LOCAL_CATE_KEY,
      JSON.stringify([data.category, ...categories])
    );
    setValue("category", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("category", { required: "Please write a category" })}
        placeholder="write a category"
      />
      <Button>Add Category</Button>
    </Form>
  );
};

export default CreateCategory;
