import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { useStore } from "../store/store";
import sleeperJSON from "../resources/players/sleeperPlayers.json";

export default function TeamsView() {
    const leagueTeams = useStore((state) => state.leagueTeams);
    const [ownerNames, setOwnerNames] = useState({});
    const playersArray = Object.values(sleeperJSON);

    useEffect(() => {
        // Fetch and store the user display names for each owner ID
        leagueTeams.forEach((team) => {
            userDisplayNameFetch(team.owner_id)
                .then((displayName) => {
                    setOwnerNames((prevOwnerNames) => ({
                        ...prevOwnerNames,
                        [team.owner_id]: displayName,
                    }));
                })
                .catch((error) => {
                    console.error(error);
                    setOwnerNames((prevOwnerNames) => ({
                        ...prevOwnerNames,
                        [team.owner_id]: "N/A",
                    }));
                });
        });
    }, [leagueTeams]);

    function teamUI(team) {
        return team.players.map((player) => <p className="px-1 flex-row">{playersArray.find(x => x.player_id === player).full_name}</p>);
    }

    function userDisplayNameFetch(owner_id) {
        const url = `https://api.sleeper.app/v1/user/${owner_id}/`;

        return fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((data) => {
                return data.display_name;
            })
            .catch(() => {
                return "N/A";
            });
    }

    return (
        <div className="d-flex flex-column">
            {leagueTeams.map((team) => (
                <div className="d-flex flex-column">
                    <div className="px-1 d-flex flex-row">
                      <span className="px-1">
                        Owner: {ownerNames[team.owner_id] || "Loading..."}
                      </span>
                    </div>
                    <div className="px-1 d-flex flex-row">
                        <span> Players: </span>
                        {teamUI(team)}
                    </div>
                </div>
            ))}
        </div>
    );
}
