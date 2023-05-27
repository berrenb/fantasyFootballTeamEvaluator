import create from "zustand";

export const useStore = create((set, get) => ({
	username: "",

	setUsername: (newUser) => set(() => ({
		username: newUser,
	})),

	userId: null,

	setUserId: (newUserId) => set(() => ({
		userId: newUserId,
	})),

	// 1 = Sleeper 2 = MFL
	leagueProvider: "1",

	setLeagueProvider: (newLeagueProvider) => set(() => ({
		leagueProvider: newLeagueProvider,
	})),

	// For Sleeper/MFL
	leagueId: "",

	setLeagueId: (newLeagueId) => set(() => ({
		leagueId: newLeagueId,
	})),

	// League Teams with Rosters
	leagueTeams: [],

	setLeagueTeams: (newLeagueTeams) => set(() => ({
		leagueTeams: newLeagueTeams,
	})),

	// UserTeam
	userTeam: {},

	setUserTeam: (newUserTeam) => set(() => ({
		userTeam: newUserTeam,
	})),

	sfPlayers: [],

	setSFPlayers: (newPlayers) => set(() => ({
		sfPlayers: newPlayers,
	})),
}));