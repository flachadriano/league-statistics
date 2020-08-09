export default class BaseLeague {

    constructor(league, standing, teams, matches) {
        this.league = league;
        this.standing = standing || [];
        this.teams = teams;
        this.matches = matches || [];
    }

    async loadClubs() {
        console.error('loadClubs not implemented.');
        return new Promise(resolve => resolve([]));
    }

}