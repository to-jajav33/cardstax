import * as requestPromise from 'request-promise';
import { EventEmitter } from 'events';

export interface ICSFigmaOptions {
	uri: any,
	method?: string,
	headers?: any
	qs?: string,
	body?: any,
	json?: boolean,
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
 * Wrapper for Figma API {@link|https://www.figma.com/developers/api}
 *
 * @export
 * @class CSFigmaAPI
 */
export class CSFigmaAPI {
	private __prefix : string;
	private __accessToken : string;

	constructor () {
		this.__accessToken = process.env.FIGMA_ACCESS_TOKEN;
		this.__prefix = 'https://api.figma.com/v1';
	}

	public buildOptions (options : ICSFigmaOptions) : ICSFigmaOptions {
		let headers = {
			'X-Figma-Token': this.__accessToken
		}

		if (!options.hasOwnProperty('headers')) {
			options.headers = {};
		}
		Object.assign(options.headers, headers);
		return options;

		//NaFzAmlIwXAiTNSy4h4yPMEa
	}

	public async me () : Promise<ICSGCSession> {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/me`,
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
		
	}

	public async logOut (sessionID : string) : Promise<ICSGCSession> {
		return null;
	}

	get prefix () : string {
		return this.__prefix;
	}
	
}

export default CSFigmaAPI;
