import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface SerializedXMLContent {
	contents: string;
}

class ProxyService {
	static baseUrl = 'https://allorigins.hexlet.app/';

	static getXML(
		url: string,
		timeout = 30000,
	): Promise<AxiosResponse<SerializedXMLContent>> {
		const { href: endpointUrl } = new URL(
			`get?disableCache=true&url=${encodeURIComponent(url)}`,
			this.baseUrl,
		);

		return axios.get(endpointUrl, { timeout });
	}
}

export default ProxyService;
