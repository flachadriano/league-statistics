export default class Match {

    constructor(match) {
        this.data = match;

        this.date = match.utcDate;
        this.team1 = match.homeTeam.name;
        this.team2 = match.awayTeam.name;
    }

    home(club) {
        return this.data.homeTeam.name == club.name;
    }

    has(club) {
        const home = this.home(club);
        const away = this.data.awayTeam.name == club.name;
        return home || away;
    }

    played() {
        return this.data.status == 'FINISHED';
    }

    scored(club) {
        if (this.home(club)) {
            return this.data.score.fullTime.homeTeam;
        } else {
            return this.data.score.fullTime.awayTeam;
        }
    }

    goals() {
        return this.data.score.fullTime.homeTeam
            + this.data.score.fullTime.awayTeam;
    }

}