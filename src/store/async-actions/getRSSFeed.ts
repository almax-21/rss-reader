import { IPost } from '../../models/IPost';
import { RssFeedData } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';

export const getRSSFeed = createAsyncThunk(
	'rss/getRSSFeed',
	async ([feedUrl, networkErrorMessage]: [string, string], thunkAPI) => {
		try {
			const { data } = await axios.get(
				`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(
					feedUrl
				)}`
			);

			const rssXML = new DOMParser().parseFromString(
				data.contents,
				'application/xml'
			);

			const feedChannelElement = rssXML.querySelector('channel');
			const feedId = uuid4();

			const feedTitleElement =
				feedChannelElement?.querySelector('channel > title');

			const feedDescriptionElement = feedChannelElement?.querySelector(
				'channel > description'
			);

			const feedItemNodeList: NodeListOf<Element> | undefined =
				feedChannelElement?.querySelectorAll('item');

			const feedItems: Element[] = Array.from(feedItemNodeList || []);

			if (feedTitleElement && feedDescriptionElement) {
				const feedData: RssFeedData = {
					id: feedId,
					title: feedTitleElement?.textContent as string,
					description: feedDescriptionElement?.textContent as string,
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
		} catch (err) {
			return thunkAPI.rejectWithValue(networkErrorMessage);
		}
	}
);
