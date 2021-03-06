const game = require('./game')

class GeoResources {
    constructor (
        id,
        role="sane",
        position=[],
        ttl=game.getTtl(),
        url="",
        blurred=false,
        status="alive",
        trophies=[]
    ) {
        this.id = id;
        this.role = role;
        this.position = position;
        this.ttl = ttl;
        this.url = url;
        this.blurred = blurred;
        this.status = status;
        this.trophies = trophies;
    }

    addTrophy(trophy) {
        this.trophies.push(trophy)
    }
}

module.exports = GeoResources;