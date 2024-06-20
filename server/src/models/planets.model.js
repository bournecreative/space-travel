const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse')


const results = []

function isHospitable (planetData) {
    return planetData['koi_disposition'] === 'CONFIRMED'
    && planetData['koi_insol'] > 0.36
    && planetData['koi_insol'] < 1.11
    && planetData['koi_prad'] < 1.6
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', (data) => {
            if (isHospitable(data)) {
                results.push(data)
            }
        })
        .on('error', (err) => {
            reject(err)
        })
        .on('end', () => {
            resolve()
            console.log('done', results.length)
        })
    })
}


module.exports = {
    loadPlanetsData,
    planets: results
}


