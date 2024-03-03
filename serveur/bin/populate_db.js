const Model = require('../models/exercise_model');
const mongoose = require('mongoose');
require('dotenv').config();
const dbString = process.env.DATABASE_URI;

function populateDB() {
	//Connect to db
	mongoose.connect(dbString);
	//Nuke the collection from orbit
	Model.collection.drop();
	//Repopulate collection
	getData();
}

async function getData() {
	let count = 0;
	const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=1500';
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'ca4bc01b0amsh57d5ff7c0eaa839p1ff802jsn611ebca12515',
			'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
		},
	};
	try {
		const postData = await fetch(url, options);
		const reponse = await postData.json();

		for (let i = 0; i < reponse.length; i++) {
			const exercises = new Model({
				bodyPart: reponse[i]['bodyPart'],
				equipment: reponse[i]['equipment'],
				gifUrl: reponse[i]['gifUrl'],
				id: reponse[i]['id'],
				name: reponse[i]['name'],
				target: reponse[i]['target'],
				secondaryMuscles: reponse[i]['secondaryMuscles'],
				instructions: reponse[i]['instructions'],
			});
			exercises.save();
			count++;
		}
	} catch (error) {
		console.error(error);
	}
	console.log('Please wait a few moments to make sure all the documents get saved! C:' + '\nSaved this many documents: ' + count);
}

module.exports = { populateDB };
