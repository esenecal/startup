import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./app.css";   // The local css file.
import "./upload/upload.css";

// Router components and files.
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Find } from "./find-recipe/find";
import { Upload } from "./find-recipe/upload";

// Note that placing the className "body" was required, and changing app.css to accomodate it.
export default function App() {
    return (
    <div className="body">
        App
    </div>
    );
}