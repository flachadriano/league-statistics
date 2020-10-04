const leagues = [
    {code: 'ger', name: 'Bundesliga (GER - 2020-21)', id: 2002},
    {code: 'bra', name: 'Série A (BRA - 2020-21)', id: 2013},
    {code: 'eng', name: 'Premier League (ENG - 2020-21)', id: 2021},
    {code: 'fra', name: 'Ligue 1 (FRA - 2020-21)', id: 2015},
    {code: 'ita', name: 'Serie A (ITA - 2020-21)', id: 2019},
    {code: 'por', name: 'Primeira Liga (POR - 2020-21)', id: 2017},
    {code: 'esp', name: 'Primera Division (ESP - 2020-21)', id: 2014}
];

let exportableData = [];

for (const league of leagues) {
    exportableData.push({
        key: league.code,
        value: league.name,
        clubsUrl: `competitions/${league.id}/standings?season=${2020}&standingType=TOTAL`,
        matchesUrl: `competitions/${league.id}/matches?season=${2020}`
    });
}

export default exportableData;