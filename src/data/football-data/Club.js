import BaseClub from '../BaseClub';
import Match from './Match';

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
        if (!this.rankedScoreV) {
            this.rankedScoreV = this.league.standingBy('goalsFor', this.club);
        }
        return this.rankedScoreV;
    }

    against() {
        return this.standing.goalsAgainst;
    }

    againstPerMatch() {
        return (this.against() / this.standing.playedGames).toFixed(2);
    }

    rankedAgainst() {
        if (!this.rankedAgainstV) {
            this.rankedAgainstV = this.league.standingBy('goalsAgainst', this.club, true);
        }
        return this.rankedAgainstV;
    }

    topScored() {
        const scoredMatches = this.matches.map(m => new Match(m).scored(this.club));
        return Math.max(...scoredMatches);
    }

    topScoredMatch() {
        const scoredMatches = this.matches.map(m => new Match(m).goals());
        return Math.max(...scoredMatches);
    }

    nextMatch() {
        return super.nextMatch();
    }

    lastMatches() {
        super.lastMatches();
    }

}