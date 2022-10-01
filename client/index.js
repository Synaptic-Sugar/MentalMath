import React from "react";
import { createRoot } from "react-dom/client";
import styles from "./styles/main.scss";
import App from "./components/App";

;

//create a root
const root = createRoot(document.getElementById('root'));

//initial render
root.render(<App/>)