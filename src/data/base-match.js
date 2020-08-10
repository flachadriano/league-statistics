export default class Match {

    constructor(date, team1, team2, score1, score2) {
        this.date = date;
        this.team1 = team1;
        this.team2 = team2;
        this.score1 = score1;
        this.score2 = score2;
    }

    static validatePlayed(data) {
        const validate = attr => {
            if (typeof data[attr] == 'undefined') {
                console.error(`match must have ${attr} attribute`);
            }
        }

        ['win', 'draw', 'lose', 
        'teamScoreFirstHalf', 'teamAgainstFirstHalf', 
        'teamScored', 'teamAgainst'].forEach(attr => validate(attr));
    }

}