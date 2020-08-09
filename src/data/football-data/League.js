import { URL, HEADERS } from './Resources';
import BaseLeague from '../base-league';
import Match from './Match';

export default class League extends BaseLeague {

    async loadClubs() {
        if (!this.teams) {
            this.standing = await this.loadStanding();
            this.teams = this.standing.map(team => team.team);
            this.matches = await this.loadMatches();
        }
        return Promise.resolve(this.teams);
    }
    
    async loadStanding() {
        return await fetch(`${URL}/${this.league.clubsUrl}`, HEADERS)
            .then(r => r.json()).then(data => data.standings[0].table);
    }

    async loadMatches() {
        return await fetch(`${URL}/${this.league.matchesUrl}`, HEADERS)
            .then(r => r.json()).then(data => data.matches);
    }

    clubStanding(club) {
        return this.standing.find(s => s.team.name == club.name);
    }

    clubMatches(club) {
        return this.matches.filter(match => new Match(match).has(club));
    }

    standingBy(field, club, ascending = false) {
        const ascendingSort = (a, b) => a[field] - b[field];
        const descendingSort = (a, b) => b[field] - a[field];
        const sortBy = ascending ? ascendingSort : descendingSort;

        return this.standing.sort(sortBy)
            .map(position => position.team.name)
            .indexOf(club.name) + 1;
    }

}