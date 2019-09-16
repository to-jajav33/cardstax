import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import CSGameCrafterAPI from './CSGameCrafterAPI';

/*
 * Questions:
 1. Adding a node after a transaction/broadcast is called, does not get pending transactions.
 2. Should I add signature to transactions? See other youtube video.
 3. should i renam transaction/broadcast to transaction-and-broadcast to follow guideline?
 4. Should I create a request util function that fills in all the similar values? to avoid repetition
 5. should I optimize isChainValid to take in an object instead of requiring to clone a BlockChain to use isChainValid?
 */

export const __isWatching = process.argv[4] === 'watch';

interface ICSResponse {
	note: string,
	success: boolean,
	e ?: Error,
	['props'] ?: any
}

export class api {
	private __PORT_NUMBER : Number;
	private __expressServer : http.Server;
	private __expressApp : express.Application;
	private __api : CSGameCrafterAPI;

	constructor () {
		let PORT_NUMBER : Number;
		if (!isNaN(parseInt(process.argv[2]))) {
			PORT_NUMBER = parseInt(process.argv[2]);
		} else if (!isNaN(parseInt(process.env.CARDSTAX_NODE_PORT_NUMBER))) {
			PORT_NUMBER = parseInt(process.env.CARDSTAX_NODE_PORT_NUMBER);
		} else {
			PORT_NUMBER = 3000;
		}
		this.__PORT_NUMBER = PORT_NUMBER;

		this.__api = new CSGameCrafterAPI();
	}

	private __setupEndPoints () : express.Application {
		if (!this.__expressServer) {
			// start app
			this.__expressApp = express() as express.Application;
			const app = this.__expressApp;
	
			// user the library to read req.body
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({extended: false}));
			
			// req.body or req.params

			// log in
			app.post('/api/session/logIn/', async (req, res) => {
				const userCreds = {
					username: req.body.username,
					password: req.body.password
				};

				let result = await this.__api.logIn(userCreds);
	
				res.json(result);
			});

			app.delete('/api/session/logOut/', async (req, res) => {
				let { sessionID } = req.body;
				let result = await this.__api.logOut(sessionID);

				res.json(result);
			});

	
			// app.get('/fake-get', (req, res) => {
			// 	const address = req.params.address;
	
			// 	res.json({
			// 		note: 'Success',
			// 		address
			// 	});
			// });
	
			// add a new transaction
			// app.post('/fake-post-easy', (req, res) => {
			// 	const outInfo = {
			// 		value: req.body.value,
			// 	};
	
			// 	res.json({ note: `Success: ${outInfo}.` });
			// });
		}

		return this.__expressApp;
	}

	public async start () : Promise<ICSResponse> {
		try {
			if (!this.__expressServer) {
				let app : express.Application = this.__setupEndPoints();
				
				const note = `Listening to port ${this.__PORT_NUMBER}`;
				let success = false;
				let result : ICSResponse = await new Promise ((paramResolve, paramReject) => {
					try {
						this.__expressServer = app.listen(this.__PORT_NUMBER, () => {
							if (__isWatching) console.log(note);
							success = true;
							paramResolve ({
								note,
								success
							});
						});
					} catch (e) {
						success = false;
						paramReject({
							note: 'Failed to start',
							success
						});
					}
				});

				if (result.success) {
					return result;
				} else {
					throw(result.note);
				}
			} else {
				throw('Server already created.');
			}
		} catch (e) {
			throw({
				note: `Error: ${e.message || e.note}`,
				error: e,
				success: false
			});
		}
	}

	public async stop () : Promise<ICSResponse> {
		try {
			if (this.__expressServer) {
				let success = false;
				let result : ICSResponse = await new Promise((paramResolve, paramReject) => {
					try {
						this.__expressServer.close(() => {
							this.__expressServer = null;
							success = true;
							paramResolve({
								note: 'Closed successfully',
								success
							});
						});
					} catch (e) {
						paramReject({
							note: 'Failed to close.',
							success
						});
					}
				});

				if (result.success) {
					return result;
				} else {
					throw(result.note);
				}
			} else {
				throw('Server is not running');
			}
		} catch (e) {
			throw({
				note: `Error: ${e.message || e.note}`,
				success: false,
				error: e
			} as ICSResponse);
		}
	}
}

export default api;


if (__isWatching) {
	const runAPI = new api();
	runAPI.start();
}
