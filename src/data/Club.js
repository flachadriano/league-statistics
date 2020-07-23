import apis from './Apis';
import FootballDbClub from './footballdb/Club';
import FootballDataClub from './football-data/Club';

export function loadClubResources(api, league, club) {
    if (league && club) {
        if (api == apis.footballdb) {
            return new FootballDbClub(league, club);
        } else {
            return new FootballDataClub(league, club);
        }
    }
}
