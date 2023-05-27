import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { useStore } from "../store/store";
import sleeperJSON from "../resources/players/sleeperPlayers.json";

export default function TeamsView() {
    const leagueTeams = useStore((state) => state.leagueTeams);
    const [ownerNames, setOwnerNames] = useState({});
    const playersArray = Object.values(sleeperJSON);
    const sfPlayers = useStore((state) => state.sfPlayers);
    const [teamScores, setTeamScores] = useState([]);

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

        const updatedTeamScores = [];

        leagueTeams.forEach((team) => {
            const owner_name = ownerNames[team.owner_id];
            const teamScore = {
                owner_name: owner_name,
                player_scores: [],
                overall_score: 0,
            };

            team.players.forEach((player) => {
                const foundPlayer = playersArray.find(
                    (x) => x.player_id === player
                );

                const player_name = foundPlayer.full_name;
                const search_name = foundPlayer.search_full_name;
                const overallPlayer = sfPlayers.find(
                    (x) =>
                        x.Name.toLowerCase()
                            .replace(" ", "")
                            .replace(".", "")
                            .replace("-", "")
                            .replace("'", "")
                            .includes(search_name)
                );

                const playerScore = {
                    player_name: player_name,
                    rbb_score: overallPlayer ? parseFloat(overallPlayer.RBBR) : 0,
                };

                teamScore.player_scores.push(playerScore);
                teamScore.overall_score = teamScore.player_scores.reduce((sum, player) => sum + player.rbb_score, 0);
            });

            updatedTeamScores.push(teamScore);
        });

        setTeamScores(updatedTeamScores);
        // TODO: Fix Render Loop
        console.log(updatedTeamScores);
    }, [leagueTeams, ownerNames, playersArray, sfPlayers, teamScores]);

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
                    </div>
                </div>
            ))}
        </div>
    );
}
