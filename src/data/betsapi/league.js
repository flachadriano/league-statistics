import JLeague from './crowlers/j-league';

export default class League {

    constructor(data) {
        this.data = data;
        new JLeague();
    }

    loadClubs() {
        return new Promise((resolve) => resolve([]));
    }

}