import { URL, HEADERS } from './Resources';

export default class League {

    standing = [];
    teams = null;

    constructor(league) {
        this.league = league;
    }

    loadFromObject(object) {
        this.league = object.league;
        this.standing = object.standing;
        this.teams = object.teams;
    }

    loadClubs() {
        return this.teams || fetch(`${URL}/${this.league.clubsUrl}`, HEADERS)
            .then(r => r.json()).then(data => data.standings[0].table)
            .then(standing => {
                this.standing = standing;
                this.teams = standing.map(team => team.team);
                return this.teams;
            });
    }

    clubStanding(club) {
        return this.standing.find(s => s.team.name == club.name);
    }

}