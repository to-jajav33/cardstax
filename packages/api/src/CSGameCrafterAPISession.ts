
import * as requestPromise from 'request-promise';
import { EventEmitter } from 'events';

export interface ICSGCSessionOptions {
	publKey: string,
	privKey: string,
	prefixUri: string,
	session ?: ICSGCSession,
}

export interface ICSGCLogInOpts {
	username : string,
	password : string,
}

export interface ICSGCSession {
	id : string,
	wing_object_type : string,
	user_id : string,
	["other"] ?: any,
}

export interface ICSGCLogOutResult {
	success : boolean,
	note ?: string,
	["other"] ?: any,
}


/**
 * Wrapper for GameCrafter Wing API {@link|https://www.thegamecrafter.com/developer/}
 *
 * @export
 * @class CSGameCrafterAPI
 */
export class CSGameCrafterAPISession extends EventEmitter {
	private __prefix : string;
	private __privateKey : string;
	private __publicKey : string;

	constructor (options : ICSGCSessionOptions) {
		super();

		this.__publicKey = options.publKey;
		this.__privateKey = options.privKey;
		this.__prefix = options.prefixUri;
	}

	get prefix () : string {
		return this.__prefix;
	}

	public async logIn (options : ICSGCLogInOpts) : Promise<ICSGCSession> {
		const loginOptions = {
			uri: `${this.__prefix}/session`,
			method: 'POST',
			body: {
				username: options.username,
				password: options.password,
				api_key_id: this.__publicKey
			},
			json: true
		};

		let resp = await requestPromise(loginOptions);

		return resp;
	}

	public async logOut (sessionID : string) : Promise<ICSGCLogOutResult> {
		let result : ICSGCLogOutResult;
		const loginOptions = {
			uri: `${this.__prefix}/session/${sessionID}`,
			method: 'DELETE',
			body: {},
			json: true
		};

		result = await requestPromise(loginOptions);

		return result;
	}
	
}

export default CSGameCrafterAPISession;
