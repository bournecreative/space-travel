const { parse } = require('csv-parse')
const fs = require('fs')

const results = []

function isHospitable (planetData) {
    return planetData['koi_disposition'] === 'CONFIRMED'
    && planetData['koi_insol'] > 0.36
    && planetData['koi_insol'] < 1.11
    && planetData['koi_prad'] < 1.6
}

fs.createReadStream('kepler_data.csv')
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
        console.log(`Error  ${err}`)
    })
    .on('end', () => {
        console.log(results)
        console.log('done', results.length)
    })

module.exports = {
    planets: results
}


