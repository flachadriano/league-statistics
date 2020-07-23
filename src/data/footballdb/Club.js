import { URL } from './Resources';
import Match from './Match';

export default class Club {

    constructor(league, club) {
        console.log(league);
        this.league = league;
        this.club = club;
        
        this.name = this.club.name;
    }

    async position() {
        const teams = await this.processClubs('points');
        return teams.map(t => t.code).indexOf(this.club.code) + 1;
    }

    async winInLast6() {
        const matches = await this.loadMatches();
        const last6matches = matches.slice(0, 6);
        const wonMatches = last6matches.filter(m => new Match(m).win(this.club));
        return wonMatches.length;
    }

    async scored() {
        const matches = await this.loadMatches();
        const v = matches.reduce((acc, match) => {
            const home = match.team1.code == this.club.code;
            console.log(home);
            acc += home ? match.score1 : match.score2;
        }, 0);
        return v;
    }

    async scoredPerMatch() {
        return 0;
    }

    async rankedScore() {
        return 0;
    }

    async loadMatches() {
        const url = `${URL}/${this.league.year}/${this.league.matches}`;
        const rounds = await fetch(url).then(r => r.json()).then(data => data.rounds);
        const allMatches = rounds.reduce((acc, round) => acc.concat(round.matches), []);
        const allPlayedMatches = allMatches.filter(m => new Match(m).played()).reverse();
        const clubMatches = allPlayedMatches.filter(m => new Match(m).club(this.club));
        return clubMatches;
    }

    async nextMatch() {
        return this.loadMatches(this.league, this.club).then(matches => matches.filter(m => m.scored1 == null && m.scored2 == null));
    }

    async lastMatches() {
        return this.loadMatches(this.league, this.club).then(matches => matches.filter(m => m.scored1 != null && m.scored2 != null));
    }

    async processClubs(orderBy) {
        const clubs = await this.league.loadClubs();
        const matches = await this.loadMatches();
    
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

}