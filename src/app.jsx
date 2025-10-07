import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "/src/app.css";   // The local css file.

// // Router components and files.
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
// import { Find } from "./find-recipe/find";       // Uncommenting these breaks the page right now.
// import { Upload } from "./upload/upload";

// Note that placing the className "body" was required, and changing app.css to accomodate it.
export default function App() {
    return (
            <div className="body">
                <header>
                    <div id="title-block">
                        <img id="icon" alt="pie icon" src="pie.png" class="rounded" width="100" height="70"/>
                            
                        <h1 id="title">Hungry?</h1>

                        <nav>
                            <menu>
                                <a href="index.html" class="btn btn-outline-primary menu-button" role="button">Upload Recipe</a>
                                <a href="find-recipe.html" class="btn btn-outline-primary menu-button" role="button">Find Recipe</a>
                            </menu>
                        </nav>
                    </div>

                    <div id="header-bar">
                    
                        <div id="header-text">
                            <h3>Upload Recipe</h3>
                            <p>Upload your favorite recipe below!</p>
                        </div>
                        
                    </div>
                </header>
            
                <main>hello!</main>

                <footer>
                    <a href="https://github.com/esenecal/startup" class="btn btn-outline-primary menu-button" role="button">Made by Edwin Senecal. Check out the Github!</a>
                </footer>
            </div>
    );
}