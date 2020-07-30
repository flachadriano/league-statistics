import { URL, HEADERS } from './Resources';
import Match from './Match';

export default class League {

    constructor(league, standing, teams, matches) {
        this.league = league;
        this.standing = standing || [];
        this.teams = teams;
        this.matches = matches || [];
    }

    loadClubs() {
        return this.teams || fetch(`${URL}/${this.league.clubsUrl}`, HEADERS)
            .then(r => r.json()).then(data => data.standings[0].table)
            .then(standing => {
                this.standing = standing;
                this.teams = standing.map(team => team.team);
                this.loadMatches();
                return this.teams;
            });
    }

    loadMatches() {
        fetch(`${URL}/${this.league.matchesUrl}`, HEADERS)
            .then(r => r.json()).then(data => data.matches)
            .then(matches => this.matches = matches);
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