import { URL, HEADERS } from './Resources';
import Match from './Match';

export default class League {

    league = null;
    standing = [];
    teams = null;
    matches = [];

    constructor(league, standing, teams, matches) {
        this.league = league;
        this.standing = standing;
        this.teams = teams;
        this.matches = matches;
    }

    loadClubs() {
        return this.teams || fetch(`${URL}/${this.league.clubsUrl}`, HEADERS)
            .then(r => r.json()).then(data => data.standings[0].table)
            .then(standing => {
                this.loadMatches();
                this.standing = standing;
                this.teams = standing.map(team => team.team);
                return this.teams;
            });
    }

    loadMatches() {
        return this.matches || fetch(`${URL}/${this.league.matchesUrl}`, HEADERS)
            .then(r => r.json).then(data => data.matches)
            .then(matches => this.matches = matches && matches);
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

        const sorted = this.standing.sort(sortBy).map(position => position.team.name);

        if (club) {
            return sorted.indexOf(club.name) + 1;
        } else {
            return sorted;
        }
    }

}