export default class Match {

    constructor(match) {
        this.data = match;
    }

    has(club) {
        const home = this.data.homeTeam.name == club.name;
        const away = this.data.awayTeam.name == club.name;
        return home || away;
    }

}