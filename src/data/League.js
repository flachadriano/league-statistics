import apis from './Apis';
import FootballDbLeague from './footballdb/League';
import FootballDataLeague from './football-data/League';

export function loadLeagueResources(api, league) {
    if (league) {
        if (api == apis.footballdb) {
            return new FootballDbLeague(league);
        } else {
            return new FootballDataLeague(league);
        }
    }
}
