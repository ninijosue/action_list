import { Keyboard } from 'react-native';

const keyboardDisplayed = (evt, setKeyboardHeight)=>{
    const keyboardOccupiedSpace = evt.endCoordinates.height.toFixed(1);
    const spaceToLeave = Number(keyboardOccupiedSpace);
    setKeyboardHeight(spaceToLeave);
}

/**
 * @param { (setKeyboardHeight: CallableFunction) =>void} setKeyboardHeight
 * 
 * */
const getKeyboardHeight = setKeyboardHeight =>{
    Keyboard.addListener("keyboardDidShow",evt=> keyboardDisplayed(evt, setKeyboardHeight));
    Keyboard.addListener("keyboardDidHide",evt=>  setKeyboardHeight(0));
}

export default getKeyboardHeight;