import apis from './Apis';
import FootballDbClub from './footballdb/Club';
import FootballDataLeague from './football-data/League';
import FootballDataClub from './football-data/Club';

export function loadClubResources(api, league, club) {
    if (league && club) {
        if (api == apis.footballdb) {
            return new FootballDbClub(league, club);
        } else {
            const loadedLeague = new FootballDataLeague();
            loadedLeague.loadFromObject(league);
            const clubStanding = loadedLeague.clubStanding(club);
            return new FootballDataClub(club, clubStanding);
        }
    }
}
