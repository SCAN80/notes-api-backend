const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let notes = [
      {
        "id": 1,
        "content": "HTML is easy",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true
      },
      {
        "id": 2,
        "content": "Browser can execute only nada",
        "date": "2019-05-30T18:39:34.091Z",
        "important": false
      },
      {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2019-05-30T19:20:14.298Z",
        "important": true
      }
    ]

const http = require('http')

//const app = http.createServer((request, response) => {
 //   response.writeHead(200, { 'Content-Type': 'application/json' })
 // response.end(JSON.stringify(notes))
//})

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes/:id', (request, response)=> {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id ===id)
  if (note) {
  response.json(note)
} else {
  response.status(404).end()
}
})

app.delete('/api/notes/:id', (request, response)=> {
  const id = Number(request.params.id)
  const note = notes.filter(note => note.id !==id)
  response.status(204).end()
})

app.post('/api/notes/:id', (request, response)=> {
  const note = request.body

  if(!note || !note.content) {
    return response.status(400)
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  
  const newNote = {
    id:maxId + 1,
    content: note.content,
    date: new Date().toISOString()
  }

  notes = notes.concat(newNote)
  response.status(201).json(newNote)
})

const PORT = process.env.PORT || 3001
3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})