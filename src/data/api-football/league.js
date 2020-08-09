import BaseLeague from '../base-league';
import { URL, HEADERS } from './resources';

export default class League extends BaseLeague {

    async loadClubs() {
        return fetch(`${URL}/${this.data.clubsUrl}`, HEADERS)
            .then(r => r.json()).then(d => d.api.standings[0])
            .then(s => s.map(c => ({ ...c, id: c.team_id, name: c.teamName })));
    }

    async loadMatches() {
        return fetch(`${URL}/${this.data.matchesUrl}`, HEADERS)
            .then(r => r.json()).then(d => d.api.fixtures);
    }

}