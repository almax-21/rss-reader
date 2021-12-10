import { MESSAGES } from '../../i18n/types';
import { filterText } from '../text';

import { ParsedFeedData, ParsedPost } from './types';

const parseRSS = (serializedData: string): ParsedFeedData => {
	const parser = new DOMParser();

	const XMLDoc: XMLDocument = parser.parseFromString(
		serializedData,
		'application/xml'
	);

	const parseError = XMLDoc.querySelector('parsererror');

	if (parseError) {
		throw new Error(MESSAGES.ERROR_INCORRECT_RSS);
	}

	const feedChannel = XMLDoc.querySelector('channel');

	const feedTitleText =
		feedChannel?.querySelector('channel > title')?.textContent;

	if (!feedChannel || !feedTitleText) {
		throw new Error(MESSAGES.ERROR_INCORRECT_RSS);
	}

	const feedDescriptionText =
		feedChannel?.querySelector('channel > description')?.textContent || '';

	const feedItemNodeList: NodeListOf<Element> =
		feedChannel?.querySelectorAll('item');

	const feedItems: Element[] = Array.from(feedItemNodeList) || [];

	const feedPosts: ParsedPost[] = feedItems.map((feedItem: Element) => {
		const title = feedItem.querySelector('title')?.textContent;
		const description = feedItem.querySelector('description')?.textContent;

		if (!title || !description) {
			throw new Error(MESSAGES.ERROR_INCORRECT_RSS);
		}

		const postUrl = feedItem.querySelector('link')?.textContent || '';

		return {
			title,
			description: filterText(description),
			url: postUrl,
		};
	});

	const parsedFeedData: ParsedFeedData = {
		parsedFeed: {
			title: feedTitleText,
			description: filterText(feedDescriptionText),
		},
		parsedPosts: feedPosts,
	};

	return parsedFeedData;
};

export default parseRSS;
