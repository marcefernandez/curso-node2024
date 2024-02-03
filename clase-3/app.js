const express = require('express') // Importa el módulo express

const app = express()
app.disable('x-powered-by') // Deshabilita el header X-Powered-By

app.get('/', (req, res) => {
    res.json({ message: 'Soy Sebastián y esta es mi primer API' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
}) 
