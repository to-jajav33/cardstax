
import { CSGameCrafterAPISession, ICSGCSession, ICSGCLogInOpts, ICSGCLogOutResult } from './CSGameCrafterAPISession';

/**
 * Wrapper for GameCrafter Wing API {@link|https://www.thegamecrafter.com/developer/}
 *
 * @export
 * @class CSGameCrafterAPI
 */
export class CSGameCrafterAPI {
	private __prefix : string;
	private __privateKey : string;
	private __publicKey : string;
	private __apiSession : CSGameCrafterAPISession

	constructor () {
		this.__publicKey = process.env.GAME_CRAFTER_API_KEY_PUB;
		this.__privateKey = process.env.GAME_CRAFTER_API_KEY_PRIV;
		this.__prefix = 'https://www.thegamecrafter.com/api';

		this.__apiSession = new CSGameCrafterAPISession({
			publKey : this.__publicKey,
			privKey : this.__privateKey,
			prefixUri : this.__prefix,
		});
	}

	public async logIn (options : ICSGCLogInOpts) : Promise<ICSGCSession> {
		return this.__apiSession.logIn(options);
	}

	public async logOut (sessionID : string) : Promise<ICSGCLogOutResult> {
		return this.__apiSession.logOut(sessionID);
	}

	get prefix () : string {
		return this.__prefix;
	}
	
}

export default CSGameCrafterAPI;
