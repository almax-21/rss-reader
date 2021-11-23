import { MESSAGES } from '../i18n/types';
import { ParsedPost, ParsedRSS } from '../types';

import { filterTextFromTags } from './text';

const parseRSS = (serializedData: string) => {
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

	const feedTitleText = feedChannel
		?.querySelector('channel > title')
		?.textContent;

	const feedDescriptionText = feedChannel
		?.querySelector('channel > description')
		?.textContent;

	const feedItemNodeList: NodeListOf<Element> | undefined =
		feedChannel?.querySelectorAll('item');

	const feedItems: Element[] = Array.from(feedItemNodeList || []);

	const feedPosts: ParsedPost[] = [
		...feedItems?.map((feedItem: Element) => {
			if (feedItem) {
				const title = feedItem.querySelector('title')?.textContent;
				const description = feedItem.querySelector('description')?.textContent;

				const postUrl = feedItem.querySelector('link')?.textContent;

				return {
					title,
					description: filterTextFromTags(description as string),
					url: postUrl,
				};
			}
		}),
	] as ParsedPost[];

	if (feedTitleText && feedDescriptionText) {
		const parsedRSSData: ParsedRSS = {
			parsedFeed: {
				title: feedTitleText,
				description: filterTextFromTags(feedDescriptionText),
			},
			parsedPosts: feedPosts,
		};

		return parsedRSSData;
	}
};

export default parseRSS;
