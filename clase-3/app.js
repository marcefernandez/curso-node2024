const express = require('express') // Importa el módulo express
const movies = require('./movies.json') // Importa el módulo movies
const crypto = require('crypto') // Importa el módulo crypto

const app = express()
app.use(express.json()) // Middleware para parsear el body de las peticiones
app.disable('x-powered-by') // Deshabilita el header X-Powered-By

// todos los recursos qu sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
    const { genre } = req.query
    res.json(movies)
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
})

app.get('/movies/:id', (req, res) => { // path-to-regexp - metodo para ingresar regex
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ error: 'Movie not found' })
})

app.post('/movies', (req, res) => {
    const {
        title,
        genre,
        year,
        director,
        duration,
        rate,
        poster
    } = req.body

    const newMovie = {
        id: crypto.randomUUID(), // genera un id unico
        title,
        genre,
        year,
        director,
        duration,
        rate: rate ?? 0,
        poster
    }

    // esto no seria rest, porque estamos guardando
    // el estado de la aplicacion en memoria
    movies.push(newMovie)

    res.status(201).json(newMovie) // actualiza la caché del cliente
})


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
}) 
