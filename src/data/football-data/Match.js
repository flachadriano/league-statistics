export default class Match {

    constructor(match) {
        this.data = match;
    }

    home(club) {
        return this.data.homeTeam.name == club.name;
    }

    has(club) {
        const home = this.home(club);
        const away = this.data.awayTeam.name == club.name;
        return home || away;
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