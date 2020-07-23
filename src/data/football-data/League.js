import { HEADERS } from './Resources';

export default class League {

    constructor(league) {
        this.league = league;
    }

    loadClubs() {
        return fetch(`${URL}/${this.league.clubsUrl}`, HEADERS)
            .then(r => r.json()).then(data => data.standings[0].table)
            .then(teams => teams.map(team => team.team));
    }

}