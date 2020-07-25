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
        return matches.reduce((acc, match) => acc + new Match(match).clubScored(this.club), 0);
    }

    async scoredPerMatch() {
        const matches = await this.loadMatches();
        const scored = await this.scored();
        return (scored / matches.length).toFixed(2);
    }

    async rankedScore() {
        const teams = await this.processClubs('goalsFor');
        return teams.map(t => t.code).indexOf(this.club.code) + 1;
    }

    async against() {
        const matches = await this.loadMatches();
        return matches.reduce((acc, match) => acc + new Match(match).clubAgainst(this.club), 0);
    }

    async againstPerMatch() {
        const matches = await this.loadMatches();
        const against = await this.against();
        return (against / matches.length).toFixed(2);
    }

    async rankedAgainst() {
        const teams = await this.processClubs('against');
        return teams.map(t => t.code).indexOf(this.club.code) + 1;
    }

    async topScored() {
        const matches = await this.loadMatches();
        const goalsInMatch = matches.map(m => new Match(m).clubScored(this.club));
        return Math.max(...goalsInMatch);
    }

    async topScoredMatch() {
        const matches = await this.loadMatches();
        const goalsInMatch = matches.map(m => new Match(m).goals());
        return Math.max(...goalsInMatch);
    }

    async loadMatches(allClubs = false) {
        const url = `${URL}/${this.league.year}/${this.league.matches}`;
        const rounds = await fetch(url).then(r => r.json()).then(data => data.rounds);
        const allMatches = rounds.reduce((acc, round) => acc.concat(round.matches), []);
        const allPlayedMatches = allMatches.filter(m => new Match(m).played()).reverse();
        if (allClubs) {
            return allPlayedMatches;
        } else {
            return allPlayedMatches.filter(m => new Match(m).club(this.club));
        }
    }

    async nextMatch() {
        return this.loadMatches(this.league, this.club).then(matches => matches.filter(m => m.scored1 == null && m.scored2 == null));
    }

    async lastMatches() {
        return this.loadMatches(this.league, this.club).then(matches => matches.filter(m => m.scored1 != null && m.scored2 != null));
    }

    async processClubs(orderBy) {
        const clubs = await this.league.loadClubs();
        const matches = await this.loadMatches(true);
    
        let processedClubs = clubs.map(club => {
            let win = 0, draw = 0, lose = 0, goalsFor = 0, goalsAgainst = 0, points = 0, games = 0;
    
            const clubMatches = matches.filter(match => new Match(match).played(club));
            clubMatches.forEach(m => {
                    const match = new Match(m);
                    
                    if (match.draw()) {
                        draw++;
                    } else if (match.win(club)) {
                        win++;
                    } else {
                        lose++;
                    }
                    
                    games++;
                    goalsFor += match.clubScored(club);
                    goalsAgainst += match.clubAgainst(club);
                });
            
            points = (win * 3) + draw;
            return Object.assign(club, { win, draw, lose, goalsFor, goalsAgainst, points, games });
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