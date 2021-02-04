//const http = require('http')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
const Person = require('./models/person')
morgan.token('post-content', (request, response) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-content'))

/*let persons = [
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
  ]*/

/*const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  //response.end('Hello World')
  response.end(JSON.stringify(notes))
})*/
app.get('/', (request, response) => {
	response.send('<h1>Hello from MongoDB backend!</h1>')
  })
  
/*app.get('/api/persons', (request, response) => {
	response.json(persons)
  })*/

  app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
	  response.json(persons)
	})
  })

app.get('/api/persons/info', (request, response) => {
	response.send(`
			<div>Phonebook has info for ${persons.length} people.</div>
			<br/>
					<div>${Date()}</div>`)
	})

/*app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	console.log(id)
	const person = persons.find(person => person.id === id)
	if (person) {
		response.json(person)
	  } else {
		response.status(404).end()
	  }
  })*/

  app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then(person => {
	  response.json(person.toJSON())
	})
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
  
  /*app.post('/api/persons', (request, response) => {
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
  })*/

  app.post('/api/persons', (request, response) => {
	const body = request.body
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
  
	const person = new Person({
		name: body.name,
		number: body.number
	})
  
	person.save().then(savedPerson => {
	  response.json(savedPerson)
	})
  })

  app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
  
	const person = {
	  name: body.name,
	  number: body.number,
	}
  
	Person.findByIdAndUpdate(request.params.id, person, { new: true })
	  .then(updatedPerson => {
		response.json(updatedPerson)
	  })
	  .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
	  .then(result => {
		response.status(204).end()
	  })
	  .catch(error => next(error))
  })

  const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
  })
  
