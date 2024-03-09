import React from "react";
import { createRoot } from "react-dom/client";
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

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Root />);