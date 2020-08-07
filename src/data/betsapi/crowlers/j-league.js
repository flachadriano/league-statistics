const URL_TABLE = 'https://betsapi.com/lt/895/Japan-J-League';
const URL_FIXTURES = 'https://betsapi.com/ls/895/Japan-J-League';

export default class JLeague {

    constructor() {
        this.loadTable();
        this.loadFixtures();
    }

    loadTable() {
        fetch(URL_TABLE);
    }

    loadFixtures() {
        fetch(URL_FIXTURES);
    }

}