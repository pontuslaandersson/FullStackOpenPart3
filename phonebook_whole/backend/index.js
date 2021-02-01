//const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
morgan.token('post-content', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-content'))

let persons = [
	{
	  name: "Touho",
      number: "444-4444-4444",
      id: 1
	},
	{
		name: "Inti",
		number: "555-5555-5555",
		id: 2
	},
	{
		name: "Talvi",
		number: "666-6666-6666",
		id: 3
	},
	{
		name: "The Master",
		number: "777-7777-7777",
		id: 4
	},
	{
		name: "The Dork",
		number: "888-8888-8888",
		id: 5
	}
  ]

/*const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  //response.end('Hello World')
  response.end(JSON.stringify(notes))
})*/
app.get('/', (request, response) => {
	response.send('<h1>Hello Dummy!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
	response.json(persons)
  })

app.get('/api/persons/info', (request, response) => {
	response.send(`
			<div>Phonebook has info for ${persons.length} people.</div>
			<br/>
					<div>${Date()}</div>`)
	})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	console.log(id)
	const person = persons.find(person => person.id === id)
	if (person) {
		response.json(person)
	  } else {
		response.status(404).end()
	  }
  })

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
  
	response.status(204).end()
  })

  // Should be Math.random()
  /*const generateId = () => {
	const maxId = persons.length > 0
	  ? Math.max(...persons.map(n => n.id))
	  : 0
	return maxId + 1
  }*/

  const generateId = () => {
	return(Math.floor(Math.random() * 1000) + 1);
  }
  
  app.post('/api/persons', (request, response) => {
	const body = request.body
	if (persons.find( ({ name }) => name === body.name )) {
		return response.status(400).json({ 
			error: 'name must be unique' 
		  })
	}
  
	if (!body.name) {
	  return response.status(400).json({ 
		error: 'name missing' 
	  })
	}
	if (!body.number) {
		return response.status(400).json({ 
		  error: 'number missing' 
		})
	  }
  
	const person = {
	  name: body.name,
	  number: body.number,
	  id: generateId()
	}
  
	persons = persons.concat(person)
  
	response.json(person)
  })


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
	  console.log(`Server running on port ${PORT}`)
	})
  
