import React, {useEffect, useState} from "react";
import "../styles/App.css";
import {useStore} from "../store/store";
import sleeperJSON from "../resources/players/sleeperPlayers.json";

export default function TeamsView() {
    const leagueTeams = useStore((state) => state.leagueTeams);
    const [ownerNames, setOwnerNames] = useState({});
    const [activeTeam, setActiveTeam] = useState({});
    const playersArray = Object.values(sleeperJSON);
    const sfPlayers = useStore((state) => state.sfPlayers);

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

    const teamScores = leagueTeams.map((team) => {
        const owner_name = ownerNames[team.owner_id];
        const playerScores = team.players.map((player) => {
            const foundPlayer = playersArray.find((x) => x.player_id === player);
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
            const rbb_score = overallPlayer ? parseFloat(overallPlayer.RBBR) : 0;
            return { player_name, rbb_score, position: foundPlayer.fantasy_positions[0] };
        });
        const overall_score = playerScores.reduce((sum, player) => sum + player.rbb_score, 0);
        return { owner_name, player_scores: playerScores, overall_score: overall_score.toFixed(2), owner_id: team.owner_id };
    });

    function obtainTopPlayers(players) {
        const positions = ['QB', 'RB', 'WR', 'TE'];

        const topPlayers = positions.reduce((topPlayersObj, position) => {
            topPlayersObj[position] = players.reduce((topPlayerObj, player) => {
                if (player.position === position && player.rbb_score > topPlayerObj.rbb_score) {
                    return player;
                }
                return topPlayerObj;
            }, {player_name: '', rbb_score: 0});
            return topPlayersObj;
        }, {});

        return (
            <>
                <p className="card-text"><span className="fw-bold">Top QB: </span> {topPlayers.QB.player_name} <span className="fw-bold">Score:</span> {topPlayers.QB.rbb_score}</p>
                <p className="card-text"><span className="fw-bold">Top RB:</span> {topPlayers.RB.player_name} <span className="fw-bold">Score:</span> {topPlayers.RB.rbb_score}</p>
                <p className="card-text"><span className="fw-bold">Top WR:</span> {topPlayers.WR.player_name} <span className="fw-bold">Score:</span> {topPlayers.WR.rbb_score}</p>
                <p className="card-text"><span className="fw-bold">Top TE:</span> {topPlayers.TE.player_name} <span className="fw-bold">Score:</span> {topPlayers.TE.rbb_score}</p>
            </>
        );
    }


    return (
        <div className="container-sm text-black">
            <div className="row">
                {[...teamScores]
                    .sort((a, b) => b.overall_score - a.overall_score)
                    .map((team, index) => (
                        <div className="col-sm-3 my-2" key={index}>
                            <div className="card d-flex flex-column h-100 mb-3">
                                <h5 className="card-header">{team.owner_name}</h5>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Overall RBB Score: {team.overall_score}</h5>
                                    {obtainTopPlayers(team.player_scores)}
                                    <button className="btn btn-primary mt-auto" data-bs-toggle="modal" data-bs-target="#rosterModal" onClick={() => setActiveTeam(team)}>View Full Roster Scores</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="modal fade" id="rosterModal" tabIndex="-1" aria-labelledby="rosterModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="rosterModalLabel">Full Roster Scores</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">RBB Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {activeTeam.player_scores.sort((a, b) => b.rbb_score - a.rbb_score).map(player => (
                                    <tr>
                                        <th scope="row">{player.player_name}</th>
                                        <td>{player.position}</td>
                                        <td>{player.rbb_score}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
