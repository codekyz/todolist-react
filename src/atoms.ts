import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const categoriesState = atom<string[]>({
  key: "categories",
  default: [],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const categorySelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    const prevCategories = Object.values(Categories);
    const categories = get(categoriesState);
    return [...prevCategories, ...categories];
  },
});

export const isDarkState = atom({
  key: "isDark",
  default: false,
});
