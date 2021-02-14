import { getManager } from 'typeorm'

export class PartnerServices {
	constructor(private manager = getManager()) { }
	async loadPartners(): Promise<any> {
		return this.manager.query('SELECT p.name, p.min_limit, i.filename FROM partner as p inner join image as i on p.id = i.imageableId');
	}
}
