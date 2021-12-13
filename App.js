import React from "react";
import { Provider } from "react-redux";
import App from "./app/components";
import store from "./app/redux/store/index";

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);