import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import CSGameCrafterAPI from './CSGameCrafterAPI';
import CSFigmaAPI from './CSFigmaAPI';

/*
 * Questions:
 1. Adding a node after a transaction/broadcast is called, does not get pending transactions.
 2. Should I add signature to transactions? See other youtube video.
 3. should i renam transaction/broadcast to transaction-and-broadcast to follow guideline?
 4. Should I create a request util function that fills in all the similar values? to avoid repetition
 5. should I optimize isChainValid to take in an object instead of requiring to clone a BlockChain to use isChainValid?
 */

export const __isWatching = process.argv[4] === 'watch';

export interface ICSRequestOptions {
	uri: any,
	method ?: string,
	headers ?: any
	qs ?: any,
	body ?: any,
	json ?: boolean,
}

export interface ICSResponse {
	note: string,
	success: boolean,
	e ?: Error,
	['props'] ?: any
}

export class api {
	private __PORT_NUMBER : Number;
	private __expressServer : http.Server;
	private __expressApp : express.Application;
	private __GameCrafterAPI : CSGameCrafterAPI;
	private __FigmaAPI : CSFigmaAPI;

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

		this.__GameCrafterAPI = new CSGameCrafterAPI();
		this.__FigmaAPI = new CSFigmaAPI();
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

				let result = await this.__GameCrafterAPI.logIn(userCreds);
	
				res.json(result);
			});

			app.delete('/api/session/logOut/', async (req, res) => {
				let { sessionID } = req.body;
				let result = await this.__GameCrafterAPI.logOut(sessionID);

				res.json(result);
			});

			app.get('/api/figma/me/', async (req, res) => {
				let result = await this.__FigmaAPI.me();
				
				res.json(result);
			});

	
			app.get('/api/figma/file/', async (req, res) => {
				const key = req.query.key;

				let result = await this.__FigmaAPI.file(key);
				
				res.json(result);
			});

			app.get('/api/figma/fileNodes/', async (req, res) => {
				const key = req.query.key;
				const ids = req.query.ids;

				let result = await this.__FigmaAPI.fileNodes(key, ids);
				
				res.json(result);
			});

			app.get('/api/figma/images/', async (req, res) => {
				const key = req.query.key;
				const ids = req.query.ids;
				const version = req.query.version;
				const scale = req.query.scale;
				const format = req.query.format;
				const svg_include_id = req.query.svg_include_id;
				const svg_simplify_stroke = req.query.svg_simplify_stroke;

				let result = await this.__FigmaAPI.images(key, ids, version, scale, format, svg_include_id, svg_simplify_stroke);
				
				res.json(result);
			});

			app.get('/api/figma/imageFills/', async (req, res) => {
				const key = req.query.key;

				let result = await this.__FigmaAPI.imageFills(key);
				
				res.json(result);
			});

			app.get('/api/figma/comments/', async (req, res) => {
				const key = req.query.key;

				let result = await this.__FigmaAPI.comments(key);
				
				res.json(result);
			});

			app.post('/api/figma/comments/', async (req, res) => {
				const key = req.query.key;
				const message = req.query.message;
				const vector = { x: req.query.x, y: req.query.y };

				let result = await this.__FigmaAPI.postComment(key, message, vector);
				
				res.json(result);
			});

			app.get('/api/figma/versions/', async (req, res) => {
				const key = req.query.key;

				let result = await this.__FigmaAPI.versions(key);
				
				res.json(result);
			});

			app.get('/api/figma/projects/', async (req, res) => {
				const team_id = req.query.team_id;

				let result = await this.__FigmaAPI.projects(team_id);
				
				res.json(result);
			});

			app.get('/api/figma/projectFiles/', async (req, res) => {
				const project_id = req.query.project_id;

				let result = await this.__FigmaAPI.projectFiles(project_id);
				
				res.json(result);
			});

			app.get('/api/figma/components/', async (req, res) => {
				const team_id = req.query.team_id;
				const page_size = req.query.page_size;
				const cursor = req.query.cursor;

				let result = await this.__FigmaAPI.components(team_id, page_size, cursor);
				
				res.json(result);
			});

			app.get('/api/figma/component/', async (req, res) => {
				const key = req.query.key;

				let result = await this.__FigmaAPI.component(key);
				
				res.json(result);
			});

			app.get('/api/figma/styles/', async (req, res) => {
				const team_id = req.query.team_id;
				const page_size = req.query.page_size;
				const cursor = req.query.cursor;

				let result = await this.__FigmaAPI.styles(team_id, page_size, cursor);
				
				res.json(result);
			});

			app.get('/api/figma/style/', async (req, res) => {
				const key = req.query.key;

				let result = await this.__FigmaAPI.style(key);
				
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
