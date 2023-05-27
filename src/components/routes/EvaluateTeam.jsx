import React, { useEffect, useState } from "react";
import "../../styles/App.css";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useStore } from "../../store/store";
import TeamsView from "../TeamsView";

export default function EvaluateTeam() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
            <h2>Here's how your team ranks</h2>
            <TeamsView />
        </div>
    )
}