import BaseLeague from '../base-league';
import { URL, HEADERS } from './resources';

export default class League extends BaseLeague {

    loadClubs() {
        return fetch(`${URL}/leagueTable/13`, HEADERS)
            .then(r => r.json()).then(d => d.api.standings[0])
            .then(s => s.map(c => ({ ...c, id: c.team_id, name: c.teamName })));
    }

}