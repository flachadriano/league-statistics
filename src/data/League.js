export function loadClubs(league) {
    const url = `https://raw.githubusercontent.com/openfootball/football.json/master/${league.year}/${league.file}`;
    return fetch(url).then(r => r.json()).then(data => data.clubs);
}

export function loadRounds(league) {
    const url = `https://raw.githubusercontent.com/openfootball/football.json/master/${league.year}/${league.matches}`;
    return fetch(url).then(r => r.json()).then(data => data.rounds);
}

export function loadMatches(league) {
    return loadRounds(league).then(rounds => rounds.map(r => r.matches).reduce((a, b) => a.concat(b), []));
}

export async function processClubs(league) {
    const clubs = await loadClubs(league);
    const matches = await loadMatches(league);

    const processedClubs = clubs.map(team => {
        let win = 0, draw = 0, lose = 0, goalsFor = 0, goalsAgainst = 0;

        matches.filter(match => match.team1.code == team.code || match.team2.code == team.code)
            .filter(match => match.score1 != null)
            .forEach(match => {
                const isHome = match.team1.code == team.code;
                if (isHome) {
                    if (match.score1 == match.score2) {
                        draw++;
                    } else if (match.score1 > match.score2) {
                        win++;
                    } else {
                        lose++;
                    }
                    goalsFor += match.score1;
                    goalsAgainst += match.score2;
                } else {
                    if (match.score1 == match.score2) {
                        draw++;
                    } else if (match.score1 < match.score2) {
                        win++;
                    } else {
                        lose++;
                    }
                    goalsFor += match.score1;
                    goalsAgainst += match.score2;
                }
            });
        
        return Object.assign(team, { win, draw, lose, goalsFor, goalsAgainst });
    });

    return processedClubs;
}
