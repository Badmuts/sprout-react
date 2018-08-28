export const getAdvertisementsByCompany = (advertisements, companyId) => {
	if (!companyId) return advertisements;
	return advertisements.filter(ad => ad && ad.company && ad.company.id === companyId)
}