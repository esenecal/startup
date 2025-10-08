import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "/src/app.css";   // The local css file.

// // Router components and files.
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Find } from "./find/find";       // Uncommenting these breaks the page right now.
import { Upload } from "./upload/upload";


// Note that placing the className "body" was required, and changing app.css to accomodate it.
export default function App() {
    return (
        <BrowserRouter>
            <div className="body">
                <header>
                    <div id="title-block">
                        <img id="icon" alt="pie icon" src="pie.png" class="rounded" width="100" height="70"/>
                            
                        <h1 id="title">Hungry?</h1>

                        <nav>
                            <menu>

                                <NavLink className="btn btn-outline-primary menu-button" to="upload">Upload Recipe</NavLink>
                                <NavLink className="btn btn-outline-primary menu-button" to="find">Find Recipes</NavLink>
                            
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
            
                <Routes>
                    <Route path="/upload" element={<Upload />} exact />
                    <Route path="/find" element={<Find />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>


                <footer>
                    <a href="https://github.com/esenecal/startup" class="btn btn-outline-primary menu-button" role="button">Made by Edwin Senecal. Check out the Github!</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main>404: Adress Unknown</main>;
}