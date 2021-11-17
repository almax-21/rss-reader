import { LOCALES } from './locales';
import { IMessages, MESSAGES } from './types';

export const messages: IMessages = {
	[LOCALES.RUSSIAN]: {
		[MESSAGES.MAIN_HEADER]: 'RSS агрегатор',
		[MESSAGES.LEAD]: 'Начните читать RSS сегодня! Это легко, это красиво.',
		[MESSAGES.RSS_INPUT]: 'Ссылка RSS',
		[MESSAGES.LOADING]: 'Загрузка',
		[MESSAGES.ADD]: 'Добавить',
		[MESSAGES.EXAMPLE]: 'Пример: https://ru.hexlet.io/lessons.rss',
		[MESSAGES.ERROR_EMPTY]: 'Поле не должно быть пустым',
		[MESSAGES.ERROR_INVALID_URL]: 'Ссылка должна быть валидным URL',
		[MESSAGES.ERROR_ALREADY_EXIST]: 'RSS уже существует',
		[MESSAGES.COPYRIGHT_CREATE]: 'Created by',
		[MESSAGES.COPYRIGHT_COMPANY]: 'Hexlet',
	},
};
