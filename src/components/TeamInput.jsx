import React, { useEffect, useState } from "react";
import "../styles/App.css";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {useStore} from "../store/store";
import { useNavigate } from 'react-router-dom';
import superFlexRankings from "../resources/players/sf_dynasty_ranks_rbb.csv";
import Papa from "papaparse";


export default function TeamInput() {
    const leagueProvider = useStore(state => state.leagueProvider);
    const setLeagueProvider = useStore(state => state.setLeagueProvider);
    const username = useStore(state => state.username);
    const setUsername = useStore(state => state.setUsername);
    const userId = useStore(state => state.userId);
    const setUserId = useStore(state => state.setUserId);
    const leagueId = useStore(state => state.leagueId);
    const setLeagueId = useStore(state => state.setLeagueId);
    const setLeagueTeams = useStore(state => state.setLeagueTeams);
    const setSFPlayers = useStore(state => state.setSFPlayers);
    const [leagues, setLeagues] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // get data from csv
        fetch(superFlexRankings).then(response => response.text()).then(text => {
            Papa.parse(text, {
                header: true,
                complete: results => {
                    setSFPlayers(results.data);
                }
            });
        });

    }, );

    useEffect(() => {
        if (userId) {
            // Get leagues on Sleeper
            const url = `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2023`; // Replace with your desired URL

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    // Handle the data from the response
                    toastr.success('League Data Obtained')
                    setLeagues(data.map(x => {
                        return {league_id: x.league_id, league_name: x.name}
                    }));
                })
                .catch(error => {
                    // Handle any errors that occurred during the fetch request
                    toastr.info(`There was an error doing your request`);
                    console.error(error);
                });
        }
    }, [userId]);

    function submitForm() {
        // Obtain user id from Sleeper
        const url = `https://api.sleeper.app/v1/user/${username}`; // Replace with your desired URL

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Handle the data from the response
                setUserId(data.user_id);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch request
                toastr.info(`There was an error doing your request`);
                console.error(error);
            });

    }

    function getLeagueRosters() {
        // Get leagues on Sleeper
        const url = `https://api.sleeper.app/v1/league/${leagueId}/rosters`; // Replace with your desired URL

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Handle the data from the response
                toastr.success('League Roster Data Obtained')
                setLeagueTeams(data);
                navigate('/evaluate-team');
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch request
                toastr.info(`There was an error doing your request`);
                console.error(error);
            });
    }

    return userId ? (<div>
        <select className="form-select my-2" aria-label="Select League" onChange={e => setLeagueId(e.target.value)}>
            <option selected>Select League</option>
            ${leagues.map(x => (<option value={x.league_id}>{x.league_name}</option>))}
        </select>
        <button className="btn btn-primary" onClick={getLeagueRosters}>Rank Teams</button>
    </div>) : (
        <div>
            <select className="form-select my-2" aria-label="League Provider" onChange={e => setLeagueProvider(e.target.value)}>
                <option selected>Select League Provider</option>
                <option value="1">Sleeper</option>
                <option value="2">MFL</option>
            </select>
            <div className="input-group flex-nowrap my-2">
                <span className="input-group-text" id="addon-wrapping">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="my-2">
                <button className="btn btn-primary" type="submit" onClick={submitForm}>Submit</button>
            </div>
        </div>
    )
}