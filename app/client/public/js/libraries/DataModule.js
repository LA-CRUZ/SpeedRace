import AjaxRequest from './AjaxRequest'

function trophies(login) {
    return AjaxRequest.getData('https://192.168.75.28/api/resources/' + login + '/trophies')
        .then((response) => {
            return response.json()
        })
}

function stats(login) {
    return AjaxRequest.putData('https://192.168.75.28/api/resources/' + login)
        .then((response) => {
            return response.json()
        })
}

function list() {
    return AjaxRequest.getData('https://192.168.75.28/api/resources')
        .then((response) => {
            return response.json()
        })
}

function changeStats(login, ttl, role, status, trophies) {
    return AjaxRequest.putData('https://192.168.75.28/api/resources/' + login + '/update', {
        ttl: ttl,
        role: role,
        status: status,
        trophies: trophies
    })
}

function changePosition(login, lat, lon) {
    return AjaxRequest.putData('https://192.168.75.28/api/resources/' + login + '/position', {
        position: [lat, lon]
    })
}

function changeImage(login, url) {
    return AjaxRequest.putData('https://192.168.75.28/api/resources/' + login + '/image', {
        url: url
    })
}

export default { trophies, stats, list, changeStats, changePosition, changeImage }