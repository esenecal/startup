import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
// import "/src/app.css"; // main css file.
import "./upload.css"; // page css file

/* Some things to change:
    Change the main header so that it has one picture. Place the page buttons on this header, so that this will not change.

    Then, for a smaller header, you can use the smaller title that describes the page.
*/

export function Upload() {
    return(
        <div className="body">
            Upload
        </div>
    );
}