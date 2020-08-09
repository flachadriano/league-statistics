import BaseClub from '../BaseClub';

export default class Club extends BaseClub {

    position() {
        return this.club.rank;
    }

    scored() {
        return this.club.all.goalsFor;
    }

    scoredPerMatch() {
        return (this.scored() / this.club.all.matchsPlayed).toFixed(2);
    }

    rankedScore() {
        const goalsFor = this.league.map(club => club.all.goalsFor).sort((a, b) => b - a);
        return goalsFor.indexOf(this.scored()) + 1;
    }

    against() {
        return this.club.all.goalsAgainst;
    }

    againstPerMatch() {
        return (this.against() / this.club.all.matchsPlayed).toFixed(2);
    }

    rankedAgainst() {
        const goalsAgainst = this.league.map(club => club.all.goalsAgainst).sort((a, b) => b - a);
        return goalsAgainst.indexOf(this.against()) + 1;
    }

}