import React from "react";
import "../../styles/App.css";
import 'toastr/build/toastr.min.css';
import TeamsView from "../TeamsView";

export default function EvaluateTeam() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
            <h2>Here are the team ranks for this league</h2>
            <TeamsView />
        </div>
    )
}