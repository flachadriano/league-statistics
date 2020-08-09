import BaseMatch from '../base-match';

export default class Match extends BaseMatch {

    constructor(data) {
        super(data.event_date, data.homeTeam.team_name, data.awayTeam.team_name);
    }

}