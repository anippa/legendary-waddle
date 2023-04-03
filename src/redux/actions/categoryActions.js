import * as actionTypes from "./actionTypes";
import axios from "axios";

export function changeCategory(category) {
  return {
    type: actionTypes.CHANGE_CATEGORY,
    payload: category,
  };
}

export function getCategories() {
  return function (dispatch) {
    let url = "http://localhost:3000/categories";
    // return axios.get(url).then(response => dispatch(getCategoriesSuccess(response.data))).catch(error=>console.error(error))
    return fetch(url)
      .then(response => response.json())
      .then(result => dispatch(getCategoriesSuccess(result))).catch(error=>console.error(error))
  };
}

export function getCategoriesSuccess(categories) {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories,
  };
}

