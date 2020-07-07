export const leagues = [
    {key: 'pl1920', value: 'Premier League (2019-20)', year: '2019-20', file: 'en.1.clubs.json'}
];

export default leagues;

export function findLeague(key) {
    return leagues.find(l => l.key == key);
}