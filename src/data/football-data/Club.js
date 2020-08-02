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
        const nextMatches = this.matches.filter(m => !new Match(m).played());
        if (nextMatches.length > 0) {
            return new Match(nextMatches[0]);
        } else {
            return {team1: '--', team2: '--'};
        }
    }

    lastMatches(quantity) {
        const playedMatches = this.matches.filter(m => new Match(m).played());
        if (playedMatches.length > 0) {
            return playedMatches.reverse().slice(0, quantity).map(m => {
                const match = new Match(m, this.club);
                match.win = match.win(this.club);
                match.home = match.home(this.club);
                return match;
            });
        } else {
            return [];
        }
    }

}