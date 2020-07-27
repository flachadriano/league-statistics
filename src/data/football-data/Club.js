import BaseClub from '../BaseClub';

export default class Club extends BaseClub {

    constructor(club, standingData) {
        super();
        this.club = club;
        this.standingData = standingData;

        this.name = club.name;
    }

    position() {
        return this.standingData.position;
    }

    winInLast6() {
        super.winInLast6();
    }

    scored() {
        return this.standingData.goalsFor;
    }

    scoredPerMatch() {
        return (this.scored() / this.standingData.playedGames).toFixed(2);
    }

    rankedScore() {
        return super.rankedScore();
    }

    against() {
        return this.standingData.goalsAgainst;
    }

    againstPerMatch() {
        return (this.against() / this.standingData.playedGames).toFixed(2);
    }

    rankedAgainst() {
        return super.rankedAgainst();
    }

    topScored() {
        return super.topScored();
    }

    topScoredMatch() {
        return super.topScoredMatch();
    }

    nextMatch() {
        return super.nextMatch();
    }

    lastMatches() {
        super.lastMatches();
    }

}