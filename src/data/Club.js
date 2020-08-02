import apis from './Apis';
import FootballDbClub from './footballdb/Club';
import FootballDataLeague from './football-data/League';
import FootballDataClub from './football-data/Club';

export function loadClubResources(api, leagueObj, club) {
    if (leagueObj && club) {
        if (api == apis.footballdb) {
            return new FootballDbClub(leagueObj, club);
        } else {
            let loadedClub = club;
            const { league, standing, teams, matches } = leagueObj;
            const loadedLeague = new FootballDataLeague(league, standing, teams, matches);
            if (typeof club == 'string') {
                loadedClub = teams.find(t => t.name == club);
            }
            return new FootballDataClub(loadedClub, loadedLeague);
        }
    }
}
