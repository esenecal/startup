import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./app.css";   // The local css file.

// // Router components and files.
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Find } from "./find/find";
import { Upload } from "./upload/upload";
import { notificationClient } from "./notificationClient";

const myClient = new notificationClient();

// Note that placing the className "body" was required, and changing app.css to accomodate it.
// Make sure only App is listed as default.
export default function App() {

    return (
        <BrowserRouter>
            <div className="body">
                <header>
                    <div id="title-block">
                        <img id="icon" alt="pie icon" src="pie.png" className="rounded" width="100" height="70"/>
                            
                        <h1 id="title">Hungry?</h1>

                        <nav>
                            <menu>

                                <NavLink className="btn btn-outline-primary menu-button" to="/">Upload Recipe</NavLink>
                                <NavLink className="btn btn-outline-primary menu-button" to="find">Find Recipes</NavLink>
                            
                            </menu>
                        </nav>
                    </div>
                </header>
            
                <Routes>
                    <Route path="/" element={<Upload webSocket={myClient}/>} />
                    <Route path="/find" element={<Find webSocket={myClient}/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>


                <footer>
                    <a href="https://github.com/esenecal/startup" className="btn btn-outline-primary menu-button" role="button">Made by Edwin Senecal. Check out the Github!</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main>404: Address Unknown</main>;
}