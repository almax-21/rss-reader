import { MESSAGES } from '../i18n/types';
import { IPost } from '../models/IPost';
import { RSSFeedData } from '../store/types';
import { v4 as uuid4 } from 'uuid';

const parseRSS = (serializedData: string, feedUrl: string) => {
	const parser = new DOMParser();

	const rssXML: XMLDocument = parser.parseFromString(
		serializedData,
		'application/xml'
	);

	const parseError = rssXML.querySelector('parsererror');

	if (parseError) {
		throw new Error(MESSAGES.ERROR_INCORRECT_RSS);
	}

	const feedChannel = rssXML.querySelector('channel');
	const feedId = uuid4();

	const feedTitle = feedChannel?.querySelector('channel > title');

	const feedDescription = feedChannel?.querySelector('channel > description');

	const feedItemNodeList: NodeListOf<Element> | undefined =
		feedChannel?.querySelectorAll('item');

	const feedItems: Element[] = Array.from(feedItemNodeList || []);

	if (feedTitle && feedDescription) {
		const feedData: RSSFeedData = {
			id: feedId,
			title: feedTitle?.textContent as string,
			description: feedDescription?.textContent as string,
			url: feedUrl,
			posts: [
				...feedItems?.map((feedItem: Element) => {
					if (feedItem) {
						const title = feedItem.querySelector('title')
							?.textContent as string;
						const description = feedItem.querySelector('description')
							?.textContent as string;

						return {
							id: uuid4(),
							feedId,
							title,
							description,
						};
					}
				}),
			] as IPost[],
		};

		return feedData;
	}
};

export default parseRSS;