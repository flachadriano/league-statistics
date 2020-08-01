export default class Match {

    constructor(match) {
        this.data = match;

        this.date = match.utcDate;
        this.team1 = match.homeTeam.name;
        this.team2 = match.awayTeam.name;
        this.score1 = this.data.score.fullTime.homeTeam;
        this.score2 = this.data.score.fullTime.awayTeam;
        this.draw = this.score1 == this.score2;
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

    win(club) {
        if (this.home(club)) {
            return this.score1 > this.score2;
        } else {
            return this.score1 < this.score2;
        }
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