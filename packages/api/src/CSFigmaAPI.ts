import * as requestPromise from 'request-promise';
import { EventEmitter } from 'events';
import { ICSRequestOptions } from './api';

export interface ICSFigmaUser {
	id: string,
	handle: string,
	img_url: string,
	email: string
}

export interface ICSFigmaFile {
	id: string,
	name: string,
	visible: boolean,
	type: any
}

export interface IVector {
	x: number,
	y: number
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

	/**
	 * Build request options with the Figma access token header
	 * 
	 * @param options 
	 */
	public buildOptions (options : ICSRequestOptions) : ICSRequestOptions {
		let headers = {
			'X-Figma-Token': this.__accessToken
		}

		if (!options.hasOwnProperty('headers')) {
			options.headers = {};
		}
		Object.assign(options.headers, headers);
		return options;
	}

	/**
	 * Get user information for the authenticated user
	 */
	public async me () : Promise<ICSFigmaUser> {
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

	/**
	 * Returns the document refered to by :key as a JSON object.
	 * The file key can be parsed from any Figma file url: https://www.figma.com/file/:key/:title.
	 * The name, lastModified, thumbnailURL, and version attributes are all metadata of the retrieved file.
	 * The document attribute contains a Node of type DOCUMENT.
	 * 
	 * @param key 
	 * @param version 
	 * @param ids 
	 * @param depth 
	 * @param geometry 
	 */
	public async file (key : string, version : string = "", ids : string = "", depth : number = null, geometry : string = "") : Promise<ICSFigmaFile> {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/files/${key}`,
				method: 'GET',
				qs: {},
				json: true
			}
		);
		
		if (version) options.qs['version'] = version;
		if (ids) options.qs['ids'] = ids;
		if (depth) options.qs['depth'] = depth;
		if (geometry) options.qs['geometry'] = geometry;

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * Returns the nodes referenced to by :ids as a JSON object.
	 * The nodes are retrieved from the Figma file referenced to by :key.
	 * 
	 * @param key 
	 * @param ids 
	 * @param version 
	 * @param geometry 
	 */
	public async fileNodes (key: string, ids : string, version : string = "", geometry : string = "") : Promise<ICSFigmaFile> {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/files/${key}/nodes`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		if (ids) options.qs['ids'] = ids;
		if (version) options.qs['version'] = version;
		if (geometry) options.qs['geometry'] = geometry;

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * Renders images from a file.
	 * 
	 * If no error occurs, "images" will be populated with a map from node IDs to URLs of the rendered images,
	 * and "status" will be omitted. The image assets will expire after 30 days.
	 * 
	 * @param key 
	 * @param ids 
	 * @param version 
	 * @param scale 
	 * @param format 
	 * @param svg_include_id 
	 * @param svg_simplify_stroke 
	 */
	public async images(key : string, ids : string, version : string = "", scale : number = null, format : string = "", svg_include_id : boolean = false, svg_simplify_stroke : boolean = true) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/images/${key}`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		if (ids) options.qs['ids'] = ids;
		if (version) options.qs['version'] = version;
		if (scale) options.qs['scale'] = scale;
		if (format) options.qs['format'] = format;
		options.qs['svg_include_id'] = svg_include_id;
		options.qs['svg_simplify_stroke'] = svg_simplify_stroke;

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * Returns download links for all images present in image fills in a document.
	 * Image fills are how Figma represents any user supplied images.
	 * When you drag an image into Figma, we create a rectangle with a single fill that represents the image,
	 * and the user is able to transform the rectangle (and properties on the fill) as they wish.
	 * 
	 * This endpoint returns a mapping from image references to the URLs at which the images may be download.
	 * Image URLs will expire after no more than 14 days. Image references are located in the output
	 * of the GET files endpoint under the imageRef attribute in a Paint.
	 * 
	 * @param key 
	 */
	public async imageFills(key : string) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/files/${key}/images`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * A list of comments left on the file.
	 * 
	 * @param key 
	 */
	public async comments(key : string) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/files/${key}/comments`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * Posts a new comment on the file.
	 * 
	 * @param key 
	 * @param message 
	 * @param client_meta 
	 */
	public async postComment(key : string, message : string, client_meta : IVector) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/files/${key}/comments`,
				qs: { message : message, client_meta : client_meta },
				method: 'POST',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * A list of versions of a file.
	 * 
	 * @param key 
	 */
	public async versions(key : string) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/files/${key}/versions`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * You can use this Endpoint to get a list of all the Projects within the specified team.
	 * This will only return projects visible to the authenticated user or owner of the
	 * developer token. Note: it is not currently possible to programmatically obtain the
	 * team id of a user just from a token. To obtain a team id, navigate to a team page of a
	 * team you are a part of. The team id will be present in the URL after the word team
	 * and before your team name.
	 * 
	 * @param team_id
	 */
	public async projects(team_id : string) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/teams/${team_id}/projects`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * List the files in a given project.
	 * 
	 * @param project_id
	 */
	public async projectFiles(project_id : string) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/projects/${project_id}/files`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * Get a paginated list of published components within a team library.
	 * 
	 * @param team_id
	 */
	public async components(team_id : string, page_size : number, cursor: any) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/teams/${team_id}/components`,
				qs: { page_size: page_size, cursor: cursor },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * Get metadata on a component by key.
	 * 
	 * @param key
	 */
	public async component(key : string) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/components/${key}`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * Get a paginated list of published styles within a team library.
	 * 
	 * @param team_id
	 */
	public async styles(team_id : string, page_size : number, cursor: any) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/teams/${team_id}/styles`,
				qs: { page_size: page_size, cursor: cursor },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	/**
	 * Get metadata on a style by key.
	 * 
	 * @param key
	 */
	public async style(key : string) {
		let options = this.buildOptions(
			{
				uri: `${this.__prefix}/styles/${key}`,
				qs: { },
				method: 'GET',
				json: true
			}
		);

		let resp = await requestPromise(options);

		return resp;
	}

	get prefix () : string {
		return this.__prefix;
	}
	
}

export default CSFigmaAPI;
