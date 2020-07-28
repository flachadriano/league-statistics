import BaseClub from '../BaseClub';

export default class Club extends BaseClub {

    constructor(club, league) {
        super();
        this.club = club;
        this.league = league;
        this.standing = league.clubStanding(club);
        this.matches = league.clubMatches(club);

        this.name = club.name;
    }

    position() {
        return this.standing.position;
    }

    scored() {
        return this.standing.goalsFor;
    }

    scoredPerMatch() {
        return (this.scored() / this.standing.playedGames).toFixed(2);
    }

    rankedScore() {
        return this.league.standingBy('goalsFor', this.club);
    }

    against() {
        return this.standing.goalsAgainst;
    }

    againstPerMatch() {
        return (this.against() / this.standing.playedGames).toFixed(2);
    }

    rankedAgainst() {
        return this.league.standingBy('goalsFor', this.club, true);
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