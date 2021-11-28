import { Workbox, WorkboxLifecycleEvent } from 'workbox-window';

const registerServiceWorker = () => {
	if (process.env.NODE_ENV !== 'production') {
		return;
	}

	if ('serviceWorker' in navigator) {
		const wb: Workbox = new Workbox('./sw.js');

		wb.addEventListener('installed', (evt: WorkboxLifecycleEvent) => {
			if (evt.isUpdate) {
				const message =
					navigator.language === 'ru-RU'
						? 'Доступно новое обновление приложения, нажмите ОК, чтобы обновить'
						: 'New app update is available, click OK to refresh';

				const isConfirmedUpdate: boolean = confirm(message);

				if (isConfirmedUpdate) {
					window.location.reload();
				}
			}
		});

		wb.register();
	}
};

export default registerServiceWorker;
