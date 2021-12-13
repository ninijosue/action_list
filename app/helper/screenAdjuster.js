import { windowHeight, windowWidth } from "../constants";

/**
 * @param {number} dimension
 * @returns {number}
 **/
export const customWidth = (dimension)=> (windowWidth * dimension) / 100;

/**
 * @param {number} dimension
 * @returns {number}
 **/
export const customHeight = (dimension)=> (windowHeight * dimension) / 100;