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

export function loadRounds(league) {
    const url = `https://raw.githubusercontent.com/openfootball/football.json/master/${league.year}/${league.matches}`;
    return fetch(url).then(r => r.json()).then(data => data.rounds);
}

export function loadMatches(league, club) {
    return loadRounds(league).then(rounds => rounds.map(r => r.matches).reduce((a, b) => a.concat(b), []))
        .then(matches => {
            if (club) {
                return matches.filter(m => m.team1.code == club.code || m.team2.code == club.code);
            } else {
                return matches;
            }
        });
}

export async function processClubs(league, orderBy) {
    const clubs = []; // await loadClubs(league);
    const matches = await loadMatches(league);

    let processedClubs = clubs.map(team => {
        let win = 0, draw = 0, lose = 0, goalsFor = 0, goalsAgainst = 0, points = 0, games = 0;

        matches.filter(match => match.team1.code == team.code || match.team2.code == team.code)
            .filter(match => match.score1 != null)
            .forEach(match => {
                games++;
                const isHome = match.team1.code == team.code;
                if (isHome) {
                    if (match.score1 == match.score2) {
                        draw++;
                        points++;
                    } else if (match.score1 > match.score2) {
                        win++;
                        points += 3;
                    } else {
                        lose++;
                    }
                    goalsFor += match.score1;
                    goalsAgainst += match.score2;
                } else {
                    if (match.score1 == match.score2) {
                        draw++;
                        points++;
                    } else if (match.score1 < match.score2) {
                        win++;
                        points += 3;
                    } else {
                        lose++;
                    }
                    goalsFor += match.score2;
                    goalsAgainst += match.score1;
                }
            });
        
        return Object.assign(team, { win, draw, lose, goalsFor, goalsAgainst, points, games });
    });

    if (orderBy) {
        processedClubs = processedClubs.sort((a, b) => {
            const x = a[orderBy], y = b[orderBy];
            if (x < y) return 1;
            if (x > y) return -1;
            return 0;
        });
    }

    return processedClubs;
}
