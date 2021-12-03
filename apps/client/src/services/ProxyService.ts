import axios, { AxiosResponse } from 'axios';

interface SerializedXMLContent {
	contents: string;
}

class ProxyService {
	static async getXML(
		url: string,
		timeout = 30000
	): Promise<AxiosResponse<SerializedXMLContent>> {
		const proxedUrl = `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(
			url
		)}`;

		return axios.get(proxedUrl, { timeout });
	}
}

export default ProxyService;
