import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");
const rootContainer = createRoot(root);
rootContainer.render(<App />);
