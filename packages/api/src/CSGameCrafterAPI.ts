
import * as requestPromise from 'request-promise';

/**
 * Wrapper for GameCrafter Wing API {@link|https://www.thegamecrafter.com/developer/}
 *
 * @export
 * @class CSGameCrafterAPI
 */
export class CSGameCrafterAPI {
	private __prefix : string;

	constructor () {
		this.__prefix = 'https://www.thegamecrafter.com/';
	}

	get prefix () : string {
		return this.__prefix;
	}
	
}

export default CSGameCrafterAPI;
