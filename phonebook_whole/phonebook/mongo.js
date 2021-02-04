//run with node mongo.js yourpassword name number OR node mongo.js yourpassword
const mongoose = require('mongoose')

if (process.argv.length > 3) {
	if (process.argv.length < 5){
  		console.log('Please provide at least the following arguments to add a number: node mongo.js <password> <name> <number>; else provide the following to display numbers: node mongo.js <password>')
		  process.exit(1)
	}
	const password = process.argv[2]

	const url =
	`mongodb+srv://FSO:${password}@cluster0.svuym.mongodb.net/phonebook-app?retryWrites=true&w=majority`
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

	const numberSchema = new mongoose.Schema({
	name: String,
	number: String,
	})

	const Number = mongoose.model('Number', numberSchema)

	// Code for adding number.
	const number = new Number({
	name: process.argv[3],
	number: process.argv[4],
	})

	number.save().then(result => {
	console.log(`added ${result.name} number ${result.number} to phonebook`)
	mongoose.connection.close()
	})
}
else if (process.argv.length === 3){
	const password = process.argv[2]

	const url =
	`mongodb+srv://FSO:${password}@cluster0.svuym.mongodb.net/phonebook-app?retryWrites=true&w=majority`
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

	const numberSchema = new mongoose.Schema({
	name: String,
	number: String,
	})

	const Number = mongoose.model('Number', numberSchema)

	// Code for fetching number.
	Number.find({}).then(result => {
		console.log('phonebook:')
		result.forEach(number => {
		  console.log(`${number.name} ${number.number}`)
		})
		mongoose.connection.close()
	  })
}
else {
	console.log('Please provide either (1) to add a number: node mongo.js <password> <name> <number>; or (2) to display numbers: node mongo.js <password>')
		  process.exit(1)
}
