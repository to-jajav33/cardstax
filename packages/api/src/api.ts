import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as requestPromise from 'request-promise';

/*
 * Questions:
 1. Adding a node after a transaction/broadcast is called, does not get pending transactions.
 2. Should I add signature to transactions? See other youtube video.
 3. should i renam transaction/broadcast to transaction-and-broadcast to follow guideline?
 4. Should I create a request util function that fills in all the similar values? to avoid repetition
 5. should I optimize isChainValid to take in an object instead of requiring to clone a BlockChain to use isChainValid?
 */

export class api {
	private __PORT_NUMBER : Number;
	// private __nodeURLs : Array<string>;
	// private __currentNodeUrl : string;

	constructor () {
		this.__PORT_NUMBER = !isNaN(parseInt(process.argv[2])) ? parseInt(process.argv[2]) : 3000;

		// this.__currentNodeUrl = process.argv[3]; // <----- can get values form command line like this.
		// this.__nodeURLs = []; // <--- not needed, just to show a post example with lots of promises.

		this.__setupEndPoints();
	}

	private __setupEndPoints () {
		// start app
		const app = express();

		// user the library to read req.body
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: false}));

		app.get('/fake-get', (req, res) => {
			const address = req.params.address;

			res.json({
				note: 'Success',
				address
			});
		});

		// add a new transaction
		app.post('/fake-post-easy', (req, res) => {
			const outInfo = {
				value: req.body.value,
			};

			res.json({ note: `Success: ${outInfo}.` });
		});

		app.post('/fake-post-promises', (req, res) => {
			// const transaction = {
			// 	value: req.body.value,
			// 	sender: req.body.sender,
			// 	recipient: req.body.recipient
			// };

			// const allPromises = [];
			// this.__nodeURLs.forEach((networkNodeUrl) => {
			// 	const requestOptions = {
			// 		uri: `${networkNodeUrl}/transaction`,
			// 		method: 'POST',
			// 		body: transaction,
			// 		json: true
			// 	};

			// 	allPromises.push(requestPromise(requestOptions));
			// });

			// Promise.all(allPromises)
			// 	.then((data) => {
			// 		res.json({
			// 			note: 'Tranasaction created and broadcasted successfully.'
			// 		})
			// 	});
		});

		app.listen(this.__PORT_NUMBER, () => {
			console.log(`Listening to port ${this.__PORT_NUMBER}`);
		});
	}
}


if (process.argv[4] === 'watch') {
	const runAPI = new api();
}
