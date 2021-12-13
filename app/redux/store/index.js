import { createStore } from "redux";
import initialState from "../initialState";


const reduce = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_CONTENTS":
            const contents = action.contents;
            return {
                ...state,
                contents
            };
        case "UPDATE_CLICKED_ITEM":
            const clickedItem = action.item;
            return {
                ...state,
                clickedItem,
                title: clickedItem ? clickedItem.title : "",
                description: clickedItem ? clickedItem.description : ""
            };
        case "SHOW_POPUP":
            const showPopup = action.value;
            return {
                ...state,
                showPopup
            };
        case "SET_INPUT_VALUES":
            return {
                ...state,
                title: action.value.title,
                description: action.value.description
            };
        case "SET_SELECTED_ITEMS":
            return {
                ...state,
                selectedItems: action.value
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

const store = createStore(reduce);

export default store;