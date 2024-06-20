const http = require('http')
const app = require('./app')
const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
    const data = await loadPlanetsData()

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

startServer()



