import { LOCALES } from './locales';
import { IMessages, MESSAGES } from './types';

export const messages: IMessages = {
	[LOCALES.RUSSIAN]: {
		[MESSAGES.LANGUAGE]: 'Язык',
		[MESSAGES.MAIN_HEADER]: 'RSS агрегатор',
		[MESSAGES.LEAD]: 'Начните читать RSS сегодня! Это легко, это красиво.',
		[MESSAGES.RSS_INPUT]: 'Ссылка RSS',
		[MESSAGES.LOADING]: 'Загрузка',
		[MESSAGES.ADD]: 'Добавить',
		[MESSAGES.EXAMPLE]: 'Пример',
		[MESSAGES.ERROR_EMPTY]: 'Поле не должно быть пустым',
		[MESSAGES.ERROR_INVALID_URL]: 'Ссылка должна быть валидным URL',
		[MESSAGES.ERROR_NETWORK]: 'Ошибка сети. Проверьте корректность ссылки и подключение к интернету',
		[MESSAGES.ERROR_ALREADY_EXIST]: 'RSS уже существует',
		[MESSAGES.COPYRIGHT_CREATE]: 'Создано',
		[MESSAGES.COPYRIGHT_COMPANY]: 'Hexlet',
	},
	[LOCALES.ENGLISH]: {
		[MESSAGES.LANGUAGE]: 'Language',
		[MESSAGES.MAIN_HEADER]: 'RSS aggregator',
		[MESSAGES.LEAD]: "Start reading RSS today! It's easy, it's beautiful.",
		[MESSAGES.RSS_INPUT]: 'RSS link',
		[MESSAGES.LOADING]: 'Loading',
		[MESSAGES.ADD]: 'Add',
		[MESSAGES.EXAMPLE]: 'Example',
		[MESSAGES.ERROR_EMPTY]: 'The field must not be empty',
		[MESSAGES.ERROR_INVALID_URL]: 'The link must be a valid URL',
		[MESSAGES.ERROR_NETWORK]: 'Network error. Check the correctness of the link and the Internet connection',
		[MESSAGES.ERROR_ALREADY_EXIST]: 'RSS already exists',
		[MESSAGES.COPYRIGHT_CREATE]: 'Created by',
		[MESSAGES.COPYRIGHT_COMPANY]: 'Hexlet',
	},
};
