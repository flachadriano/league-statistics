export default class Match {
    
    constructor(match) {
        this.match = match;
    }

    club(club) {
        const home = this.match.team1 == club.name;
        const visitor = this.match.team2 == club.name;
        return home || visitor;
    }

    win(club) {
        const home = this.match.team1 == club.name;
        if (home) {
            return this.match.score.ft[0] > this.match.score.ft[1];
        } else {
            return this.match.score.ft[1] > this.match.score.ft[0];
        }
    }

    played(club) {
        const past = this.match.score.ft[0] != null;
        if (club) {
            return past && this.club(club);
        } else {
            return past;
        }
    }

}