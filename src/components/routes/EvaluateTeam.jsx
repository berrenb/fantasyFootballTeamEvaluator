import React from "react";
import "../../styles/App.css";
import 'toastr/build/toastr.min.css';
import TeamsView from "../TeamsView";
import { useNavigate } from 'react-router-dom';
import {useStore} from "../../store/store";

export default function EvaluateTeam() {
    const navigate = useNavigate();
    const setLeagueProvider = useStore(state => state.setLeagueProvider);
    const setUsername = useStore(state => state.setUsername);
    const setUserId = useStore(state => state.setUserId);
    const setLeagueId = useStore(state => state.setLeagueId);
    const setLeagueTeams = useStore(state => state.setLeagueTeams);

    function resetFields() {
        setLeagueProvider(null);
        setUsername("");
        setUserId(null);
        setLeagueId("");
        setLeagueTeams([])
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
            <div className="d-flex flex-row m-2">
            <h2>Here are the team ranks for this league</h2>
            <button className="mx-2 btn btn-primary" onClick={() => {
                resetFields();
                navigate('/');
            }}>Return Home</button>
            </div>
            <TeamsView />
        </div>
    )
}