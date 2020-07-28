import apis from './Apis';
import FootballDbClub from './footballdb/Club';
import FootballDataLeague from './football-data/League';
import FootballDataClub from './football-data/Club';

export function loadClubResources(api, leagueObj, club) {
    if (leagueObj && club) {
        if (api == apis.footballdb) {
            return new FootballDbClub(leagueObj, club);
        } else {
            const { league, standing, teams } = leagueObj;
            const loadedLeague = new FootballDataLeague(league, standing, teams);
            return new FootballDataClub(club, loadedLeague);
        }
    }
}
