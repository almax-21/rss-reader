import { v4 as uuid4 } from 'uuid';

import { MESSAGES } from '../i18n/types';
import { IPost } from '../models/IPost';
import { RSSFeedData } from '../store/types';

import filterTextFromTags from './filterTextFromTags';

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

	const feedTitleText =
		feedChannel?.querySelector('channel > title')?.textContent;

	const feedDescriptionText = feedChannel?.querySelector(
		'channel > description'
	)?.textContent;

	const feedItemNodeList: NodeListOf<Element> | undefined =
		feedChannel?.querySelectorAll('item');

	const feedItems: Element[] = Array.from(feedItemNodeList || []);

	if (feedTitleText && feedDescriptionText) {
		const feedData: RSSFeedData = {
			id: feedId,
			title: feedTitleText,
			description: filterTextFromTags(feedDescriptionText),
			url: feedUrl,
			posts: [
				...feedItems?.map((feedItem: Element) => {
					if (feedItem) {
						const title = feedItem.querySelector('title')?.textContent;
						const description =
							feedItem.querySelector('description')?.textContent;

						const postUrl = feedItem.querySelector('link')?.textContent;

						return {
							id: uuid4(),
							feedId,
							title,
							description: filterTextFromTags(description as string),
							url: postUrl,
						};
					}
				}),
			] as IPost[],
		};

		return feedData;
	}
};

export default parseRSS;
