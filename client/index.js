import React from "react";
import { createRoot } from "react-dom/client";
import styles from "./styles/main.scss";
import { BrowserRouter } from 'react-router-dom'
import App from "./components/App";

;

//create a root
const root = createRoot(document.getElementById('root'));

//initial render
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)