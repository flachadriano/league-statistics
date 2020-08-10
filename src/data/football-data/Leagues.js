const leagues = [
    {code: 'ger', name: 'Bundesliga (GER - 2019-20)', id: 2002},
    {code: 'braa', name: 'Série A (BRA - 2020)', id: 2013, year: 2020},
    {code: 'eng', name: 'Premier League (ENG - 2019-20)', id: 2021},
    {code: 'fra', name: 'Ligue 1 (FRA - 2019-20)', id: 2015},
    {code: 'ita', name: 'Serie A (ITA - 2019-20)', id: 2019},
    {code: 'por', name: 'Primeira Liga (POR - 2019-20)', id: 2017},
    {code: 'esp', name: 'Primera Division (ESP - 2019-20)', id: 2014}
];

let exportableData = [];

for (const league of leagues) {
    exportableData.push({
        key: league.code,
        value: league.name,
        clubsUrl: `competitions/${league.id}/standings?season=${league.year||2019}&standingType=TOTAL`,
        matchesUrl: `competitions/${league.id}/matches?season=${league.year||2019}`
    });
}

export default exportableData;