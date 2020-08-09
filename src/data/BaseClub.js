export default class BaseClub {

    constructor(club, league) {
        this.club = club;
        this.league = league;

        this.name = club.name;
    }

    static validate(club) {
        if (!club.name) {
            console.error('club should have name attribute.');
        }
    }

    position() {
        console.warn('Implement method: position');
        return 0;
    }

    winInLast6() {
        console.warn('Implement method: winInLast6');
        return 0;
    }

    scored() {
        console.warn('Implement method: scored');
        return 0;
    }

    scoredPerMatch() {
        console.warn('Implement method: scoredPerMatch');
        return 0;
    }

    rankedScore() {
        console.warn('Implement method: rankedScore');
        return 0;
    }

    against() {
        console.warn('Implement method: against');
        return 0;
    }

    againstPerMatch() {
        console.warn('Implement method: againstPerMatch');
        return 0;
    }

    rankedAgainst() {
        console.warn('Implement method: rankedAgainst');
        return 0;
    }

    topScored() {
        console.warn('Implement method: topScored');
        return 0;
    }

    topScoredMatch() {
        console.warn('Implement method: topScoredMatch');
        return 0;
    }

    nextMatch() {
        console.warn('Implement method: nextMatch');
        return {};
    }

    lastMatches() {
        console.warn('Implement method: lastMatches');
        return [];
    }

}