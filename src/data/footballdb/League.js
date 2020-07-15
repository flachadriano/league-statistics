import { URL } from './Resources';

export default class League {

    constructor(league) {
        this.league = league;
    }

    loadClubs() {
        const url = `${URL}/${this.league.year}/${this.league.file}`;
        return fetch(url).then(r => r.json()).then(data => data.clubs);
    }

}