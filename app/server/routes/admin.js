const express = require('express')
const router = express.Router()
const axios = require('axios')
const game = require("../src/game")
const geoResources = require("../src/geoResources")

function authenticate(jwt) {
    var bool = false;

    return axios.get('http://192.168.75.28:8080/authenticate', {
        headers: {
            origin: 'http://192.168.75.28:8080'
        },
        params: {
            token: jwt,
        }
    })
    .then(function(response) {
        if(response.status === 204) {
            bool = true;
        }
    })
    .catch(function(error) {
        console.log(error);
    })
    .then(function() {
        return bool;
    })
}

router.get('/', function (req, res) {
    errors = []
    res.render('admin.ejs', {
        errors
    })
})

router.post('/ttl', function (req, res) {
    ttl = req.body.ttl;
    errors = [] 
    res.render('admin.ejs', {
        errors
    })
})

router.post('/target', function (req, res) {
    errors = []
    if(game.started) {
        if(!game.getRessource('target')) {
            game.addRessource(new geoResources('target'))
        }
        game.getRessource('target').position = [parseInt(req.body.latitude), parseInt(req.body.longitude)]
    } else {
        errors.push("La partie n'a pas commencée")
    }
    res.render('admin.ejs', {
        errors
    })
})

router.post('/start', function (req, res) {
    errors = []

    game.start()
    game.name = req.body.gameName

    res.render('admin.ejs', {
        errors
    })
})

router.put('/start', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        if(bool) {
            game.start()
            game.name = req.query.name
            res.send("Game Started")
        } else {
            res.send("You're not connected")
        }
    })
})

router.put('/stop', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        if(bool) {
            game.stop()
            res.send("Game Stopped")
        } else {
            res.send("You're not connected")
        }
    })
})

router.put('/target', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        if(bool) {
            let position = []
            if(req.query.auto) {
                position[0] = parseFloat(req.query.latitude) + ((Math.random() - 0.5)/10)
                position[1] = parseFloat(req.query.longitude) + ((Math.random() - 0.5)/10)
            } else {
                position[0] = parseFloat(req.query.latitude)
                position[1] = parseFloat(req.query.longitude)
            }

            if(game.getRessource("target")) {
                game.getRessource("target").position = position

                res.send("Target has been updated")
            } else {
                game.addRessource(
                    new geoResources(
                        'target', 
                        'sane', 
                        position,
                        -1,
                        "",
                        true,
                        "target",
                        []
                    )
                )

                res.send("Target has been created")
            }
        } else {
            res.send("You're not connected")
        }
    })
})

router.put('/winner', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        if(bool) {
            if(game.getRessource(req.query.player)) {
                game.win(req.query.player)
                res.send(req.query.player, " win the game")
            } else {
                res.send("The player doesn't exist")
            }
        } else {
            res.send("You're not connected");
        } 
    })
})

router.get('/status', function (req, res) {
    authenticate(req.headers.authorization)
    .then((bool) => {
        bool ? res.send(game) : res.send("You're not connected");
    })
})

module.exports = router