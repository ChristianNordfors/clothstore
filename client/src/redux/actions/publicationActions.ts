import axios from "axios";
import { Dispatch } from "react";
import { ActionTypes } from "./actionTypes";
import { Publication } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload?: { success?: Publication[]; error?: string };
  cartPayload?: any;
};

export const putPublications =
  ({
    name = "",
    order = "",
    page = "1",
    mark = "",
    category = "",
    gender = "",
    price = "",
    author = "",
  }: {
    name?: string;
    order?: string;
    page?: string;
    mark?: string;
    category?: string;
    gender?: string;
    price?: string;
    author?: string;
  }) =>
  async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "PUBLICATION_LIST_REQUEST" });
    try {
      let filter = { mark, category, gender, price, author };
      const response = await axios.put(
        `/publications?order=${order}&name=${name}&page=${page}`,
        { mark, category, gender, price, author }
      );
      dispatch({
        type: "PUBLICATION_LIST_SUCCESS",
        payload: { success: response.data },
        cartPayload: filter,
      });
    } catch (error) {
      dispatch({
        type: "PUBLICATION_LIST_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const getNamePublications = (name: string) => async (dispatch: Dispatch<Action>) => {
  dispatch ({ type: "PUBLICATION_NAME_REQUEST" });
  try {
    const response = await axios.get("/publications?name=" + name);
    dispatch ({
      type: "PUBLICATION_NAME_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    dispatch ({
      type: "PUBLICATION_NAME_FAIL",
      payload: { error: (error as Error).message }
    })
  }
}

export const postPublications =
  (publication: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "PUBLICATION_SAVE_REQUEST" });
    try {
      await axios.post("/publications/new", publication);
      dispatch({ type: "PUBLICATION_SAVE_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "PUBLICATION_SAVE_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const cartLength = () => async (dispatch: Dispatch<Action>) => {
  let cart = localStorage.getItem("cart");
  if (typeof cart === "string") cart = JSON.parse(cart);
  const length = cart?.length;
  dispatch({
    type: "CART_LENGTH",
    cartPayload: length,
  });
};
