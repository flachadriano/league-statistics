import { URL, API_KEY } from './Resources';

export default class League {
    headers = {headers: {'X-Auth-Token': API_KEY}};

    constructor(league) {
        this.league = league;
    }

    loadClubs() {
        return fetch(`${URL}/${this.league.clubsUrl}`, this.headers)
            .then(r => r.json()).then(data => data.standings[0].table)
            .then(teams => teams.map(team => team.team));
    }

}