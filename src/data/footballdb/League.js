import { URL } from './Resources';

export function loadClubsDb(league) {
    const url = `${URL}/${league.year}/${league.file}`;
    return fetch(url).then(r => r.json()).then(data => data.clubs);
}
