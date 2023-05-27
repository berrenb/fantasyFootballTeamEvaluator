import React from "react";
import "../../styles/App.css";
import TeamInput from "../TeamInput";

export default function HomePage() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
            <h2>Welcome to the team evaluator!</h2>
            <h5>Using the RBB rankings, you can see how your team stacks up against your other league mates</h5>
            <TeamInput />
        </div>
    );
}