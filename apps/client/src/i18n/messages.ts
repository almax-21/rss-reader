import { LOCALES } from './locales';
import { IMessages, MESSAGES } from './types';

export const messages: IMessages = {
	[LOCALES.ENGLISH]: {
		[MESSAGES.LANGUAGE]: 'Language',
		[MESSAGES.ENGLISH]: 'English',
		[MESSAGES.RUSSIAN]: 'Russian',
		[MESSAGES.MAIN_HEADER]: 'RSS Reader',
		[MESSAGES.DESCRIPTION]:
			'RSS Reader is one of the best ways to keep your finger on the pulse of events. For example, a compilation of the latest news will help you stay on top of your niche or hobby.',
		[MESSAGES.KEYWORDS]: 'rss, feed, news',
		[MESSAGES.APP_LOGO]: 'App logo',
		[MESSAGES.LEAD]: "Start reading RSS today! It's easy, it's beautiful.",
		[MESSAGES.RSS_INPUT]: 'RSS link',
		[MESSAGES.SIGN_IN]: 'Sign in',
		[MESSAGES.SIGN_UP]: 'Sign up',
		[MESSAGES.SIGN_OUT]: 'Sign out',
		[MESSAGES.NO_ACCOUNT]: 'No account',
		[MESSAGES.USERNAME]: 'Username',
		[MESSAGES.PASSWORD]: 'Password',
		[MESSAGES.PASSWORD_CONFIRMATION]: 'Repeat password',
		[MESSAGES.BACK]: 'Back',
		[MESSAGES.LOADING]: 'Loading',
		[MESSAGES.ADD]: 'Add',
		[MESSAGES.SEARCH]: 'Search',
		[MESSAGES.SEARCH_BY_REQUEST]: 'Search by request',
		[MESSAGES.FIND]: 'Find',
		[MESSAGES.NOT_FOUND]: 'Not found',
		[MESSAGES.RESET]: 'Reset',
		[MESSAGES.DELETE]: 'Delete',
		[MESSAGES.EXAMPLE]: 'Example',
		[MESSAGES.POSTS]: 'Posts',
		[MESSAGES.PREVIEW]: 'Preview',
		[MESSAGES.READ]: 'Read',
		[MESSAGES.READ_MORE]: 'Read more',
		[MESSAGES.ALL]: 'All',
		[MESSAGES.MARK]: 'Mark',
		[MESSAGES.MARK_ALL_AS_READ]: 'Mark all as read',
		[MESSAGES.MARK_ALL_READ_WARNING]:
			'Are you sure you want to mark everything as read?',
		[MESSAGES.UNREAD]: 'Unread',
		[MESSAGES.CLOSE]: 'Close',
		[MESSAGES.FEEDS]: 'Feeds',
		[MESSAGES.NO_FEEDS]: 'No feeds yet',
		[MESSAGES.FEEDS_TOOLTIP]: 'Show posts from a specific feed',
		[MESSAGES.FEEDS_DELETE_WARNING]: 'Are you sure you want to delete feed?',
		[MESSAGES.SUCCESSFULLY_LOADED]: 'RSS successfully loaded!',
		[MESSAGES.INSPIRED_BY]: 'Inspired by',
		[MESSAGES.HEXLET_COMPANY]: 'Hexlet',
		[MESSAGES.ERROR_EMPTY]: 'The field must not be empty',
		[MESSAGES.ERROR_USERNAME_LENGTH]: '3 to 20 characters',
		[MESSAGES.ERROR_PASSWORD_LENGTH]: 'At least 6 characters',
		[MESSAGES.ERROR_PASSWORD_NOT_MATCH]: 'Passwords must match',
		[MESSAGES.ERROR_INCORRECT_USERNAME_PASSWORD]:
			'Incorrect username or password',
		[MESSAGES.ERROR_INVALID_URL]: 'The link must be a valid URL',
		[MESSAGES.ERROR_USER_ALREADY_EXIST]: 'User already exists',
		[MESSAGES.ERROR_RSS_ALREADY_EXIST]: 'RSS already exists',
		[MESSAGES.ERROR_NETWORK]: 'Network error. Check your internet connection',
		[MESSAGES.ERROR_TIMEOUT]: 'The response timed out.',
		[MESSAGES.ERROR_INCORRECT_RSS]: "Resource doesn't contain valid RSS",
		[MESSAGES.ERROR_UNKNOWN]: 'Something went wrong. Please try again later.',
	},
	[LOCALES.RUSSIAN]: {
		[MESSAGES.LANGUAGE]: 'Язык',
		[MESSAGES.ENGLISH]: 'Английский',
		[MESSAGES.RUSSIAN]: 'Русский',
		[MESSAGES.MAIN_HEADER]: 'RSS Reader',
		[MESSAGES.DESCRIPTION]:
			'RSS Reader - одна из лучших возможностей держать руку на пульсе событий. Например, подборка последних новостей поможет быть в курсе дел вашей ниши или хобби.',
		[MESSAGES.KEYWORDS]: 'rss, лента, новости',
		[MESSAGES.APP_LOGO]: 'Лого приложения',
		[MESSAGES.LEAD]: 'Начните читать RSS сегодня! Это легко, это красиво.',
		[MESSAGES.RSS_INPUT]: 'Ссылка RSS',
		[MESSAGES.SIGN_IN]: 'Войти',
		[MESSAGES.SIGN_UP]: 'Регистрация',
		[MESSAGES.SIGN_OUT]: 'Выйти',
		[MESSAGES.NO_ACCOUNT]: 'Нет аккаунта',
		[MESSAGES.USERNAME]: 'Имя пользователя',
		[MESSAGES.PASSWORD]: 'Пароль',
		[MESSAGES.PASSWORD_CONFIRMATION]: 'Повторите пароль',
		[MESSAGES.BACK]: 'Назад',
		[MESSAGES.LOADING]: 'Загрузка',
		[MESSAGES.ADD]: 'Добавить',
		[MESSAGES.SEARCH]: 'Поиск',
		[MESSAGES.SEARCH_BY_REQUEST]: 'Поиск по запросу',
		[MESSAGES.FIND]: 'Найти',
		[MESSAGES.NOT_FOUND]: 'Не найдено',
		[MESSAGES.RESET]: 'Сброс',
		[MESSAGES.DELETE]: 'Удалить',
		[MESSAGES.EXAMPLE]: 'Пример',
		[MESSAGES.POSTS]: 'Посты',
		[MESSAGES.PREVIEW]: 'Просмотр',
		[MESSAGES.READ]: 'Прочитанные',
		[MESSAGES.READ_MORE]: 'Читать полностью',
		[MESSAGES.UNREAD]: 'Непрочитанные',
		[MESSAGES.ALL]: 'Все',
		[MESSAGES.MARK]: 'Отметить',
		[MESSAGES.MARK_ALL_AS_READ]: 'Отметить все прочитанным',
		[MESSAGES.MARK_ALL_READ_WARNING]:
			'Вы уверены, что хотите отметить все прочитанным?',
		[MESSAGES.CLOSE]: 'Закрыть',
		[MESSAGES.FEEDS]: 'Фиды',
		[MESSAGES.NO_FEEDS]: 'Фидов пока нет',
		[MESSAGES.FEEDS_TOOLTIP]: 'Показать посты конкретного фида',
		[MESSAGES.FEEDS_DELETE_WARNING]: 'Вы уверены, что хотите удалить фид?',
		[MESSAGES.SUCCESSFULLY_LOADED]: 'RSS успешно загружен!',
		[MESSAGES.INSPIRED_BY]: 'Вдохновлено',
		[MESSAGES.HEXLET_COMPANY]: 'Хекслет',
		[MESSAGES.ERROR_EMPTY]: 'Поле не должно быть пустым',
		[MESSAGES.ERROR_USERNAME_LENGTH]: 'От 3 до 20 символов',
		[MESSAGES.ERROR_PASSWORD_LENGTH]: 'Не менее 6 символов',
		[MESSAGES.ERROR_PASSWORD_NOT_MATCH]: 'Пароли должны совпадать',
		[MESSAGES.ERROR_INCORRECT_USERNAME_PASSWORD]:
			'Неверное имя пользователя или пароль',
		[MESSAGES.ERROR_INVALID_URL]: 'Ссылка должна быть валидным URL',
		[MESSAGES.ERROR_USER_ALREADY_EXIST]: 'Пользователь уже существует',
		[MESSAGES.ERROR_RSS_ALREADY_EXIST]: 'RSS уже существует',
		[MESSAGES.ERROR_NETWORK]: 'Ошибка сети. Проверьте подключение к интернету',
		[MESSAGES.ERROR_TIMEOUT]: 'Время ожидания ответа истекло.',
		[MESSAGES.ERROR_INCORRECT_RSS]: 'Ресурс не содержит валидный RSS',
		[MESSAGES.ERROR_UNKNOWN]:
			'Что-то пошло не так. Пожалуйста, повторите попытку позже.',
	},
};