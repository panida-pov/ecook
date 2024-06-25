import axios, { isAxiosError } from "axios";
import { RecipeDto } from "../pages/RecipePage/type";
import { RecipeListDto } from "../pages/RecipesPage/type";

const baseUrl = process.env.REACT_APP_URL || "http://localhost:8000/api";

interface LabelResponse {
  id: number;
  name: string;
}

export const getLabels = async () => {
  try {
    const response = await axios.get<Array<LabelResponse>>(baseUrl + "/labels");
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getRecipelists = async () => {
  try {
    const response = await axios.get<Array<RecipeListDto>>(
      baseUrl + "/recipes"
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const addRecipe = async (payload: RecipeDto) => {
  try {
    const response = await axios.post<RecipeDto>(baseUrl + "/recipes", payload);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getRecipe = async (id: number) => {
  try {
    const response = await axios.get<RecipeDto>(baseUrl + "/recipes/" + id);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updateRecipe = async (id: number, payload: RecipeDto) => {
  try {
    await axios.put<RecipeDto>(baseUrl + "/recipes/" + id, payload);
  } catch (e) {
    throw e;
  }
};

export const deleteRecipe = async (id: number) => {
  try {
    await axios.delete(baseUrl + "/recipes/" + id);
  } catch (e) {
    throw e;
  }
};

interface Favorite {
  favorite: boolean;
}
export const updateFavorite = async (id: number, payload: Favorite) => {
  try {
    await axios.patch<RecipeDto>(
      baseUrl + "/recipes/" + id + "/update-fav",
      payload
    );
  } catch (e) {
    console.error(isAxiosError(e) ? e.response?.data : e);
  }
};
