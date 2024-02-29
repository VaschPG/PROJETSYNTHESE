import fetch from 'node-fetch';
import mongoose from 'mongoose';

//mongoose 6.10.0
const uri = 'mongodb+srv://Gabriel:Password12345@cluster0.qm5dbem.mongodb.net/PlanificateurDB';

const ExerciseModel = new mongoose.Schema({
	bodyPart: {
		type: String,
		required: true,
	},
	equipment: {
		type: String,
		required: true,
	},
	gifUrl: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	target: {
		type: String,
		required: true,
	},
	secondaryMuscles: {
		type: Array,
		required: true,
	},
	instructions: {
		type: Array,
		required: true,
	},
});

const Exercise = mongoose.model('Exercise', ExerciseModel);

async function getData() {
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
			const Exercises = new Exercise({
				bodyPart: reponse[i]['bodyPart'],
				equipment: reponse[i]['equipment'],
				gifUrl: reponse[i]['gifUrl'],
				id: reponse[i]['id'],
				name: reponse[i]['name'],
				target: reponse[i]['target'],
				secondaryMuscles: reponse[i]['secondaryMuscles'],
				instructions: reponse[i]['instructions'],
			});
			Exercises.save();
		}
	} catch (error) {
		console.error(error);
	}
}

mongoose.connect(uri, function (err, client) {
	client.db.listCollections().toArray(function (err, collections) {
		console.log(collections);
		//not completed check(regarder le nom de chaque db et si c'est undefined)
		if (collections == undefined) {
			//if datababase doesnt exist
			console.log('error, does not exist');
			//Creates database and get data from api
			getData();
			console.log('Database exercises has been created');
		} else {
			//if database exist
			console.log('Connected to database exercises');
			getExerciseBodyPart('back');
		}
	});
});

//Exemple du get
//Get exercise by body part parameter
function getExerciseBodyPart(part) {
	Exercise.aggregate([{ $match: { bodyPart: part } }, { $sample: { size: 5 } }]).exec((error, resultSet) => {
		if (error) {
			console.log(error);
		} else {
			console.log(resultSet);
		}
	});
}
