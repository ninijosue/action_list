import { Dimensions } from "react-native";

const deviceWindow = Dimensions.get("window");

export const windowWidth = deviceWindow.width;

export const windowHeight = deviceWindow.height;

export const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;