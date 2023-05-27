import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min';
import AppRouter from "./AppRouter";

function Root() {
    return (
        <AppRouter/>
    );
}

ReactDOM.render(<Root />, document.getElementById("root"));