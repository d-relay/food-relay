import { getManager } from 'typeorm'
// import { Partner } from '../entities'

export class PartnerServices {
	// private partnerRepository = entityManager(Partner)
	private manager = getManager();
	async loadPartners (): Promise<any> {
		return this.manager.query('SELECT p.name, p.min_limit, i.filename FROM public.partner as p inner join public.image as i on p.id = i."imageableId"')
	}
}
