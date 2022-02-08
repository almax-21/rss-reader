import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import { Button, CloseButton, Form, InputGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import cn from 'classnames';

import useTypedDispatch from '../../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../../hooks/redux/useTypedSelector';
import { LOCALES } from '../../../../i18n/locales';
import { MESSAGES } from '../../../../i18n/types';
import { selectActiveFeedId } from '../../../../store/selectors/contentSelectors';
import { selectSettings } from '../../../../store/selectors/settingsSelectors';
import { updateFilterQuery } from '../../../../store/slices/postsSlice';
import { debounce } from '../../../../utils/perfomance';
import { SvgIcon } from '../../../ui/svg-icon';
import { SVG_ICON_VARIANTS } from '../../../ui/svg-icon/types';

interface PostSearchProps {
	resetActivePage: () => void;
}

const SEARCH_DEBOUNCE_MS = 300;

export const PostSearch: FC<PostSearchProps> = ({ resetActivePage }) => {
	const searchRef = useRef<HTMLInputElement | null>(null);

	const {
		transcript,
		listening,
		browserSupportsSpeechRecognition,
		isMicrophoneAvailable,
	} = useSpeechRecognition();

	const { lang, isDarkTheme } = useTypedSelector(selectSettings);
	const activeFeedId = useTypedSelector(selectActiveFeedId);

	const dispatch = useTypedDispatch();

	const intl = useIntl();

	const isFullSupportSpeechRecognition =
		browserSupportsSpeechRecognition && lang === LOCALES.ENGLISH;

	const isCanNotUseSpeechRecognition =
		!isMicrophoneAvailable || !navigator.onLine;

	const updateSearchQuery = (newSearchQuery: string) => {
		dispatch(updateFilterQuery(newSearchQuery));

		if (searchRef.current) {
			searchRef.current.value = newSearchQuery;
		}

		resetActivePage();
	};

	useEffect(() => {
		if (!isMicrophoneAvailable) {
			SpeechRecognition.stopListening();
		}
	}, [isMicrophoneAvailable]);

	useEffect(() => {
		if (searchRef.current) {
			searchRef.current.value = '';
		}
	}, [activeFeedId]);

	useEffect(() => {
		if (transcript && searchRef.current) {
			const newSearchQuery = transcript.toLowerCase();

			updateSearchQuery(newSearchQuery);
		}
	}, [transcript]);

	const handleSearchChange = debounce<ChangeEvent<HTMLInputElement>, void>(
		(evt) => {
			const { value } = evt.target;

			updateSearchQuery(value);
		},
		SEARCH_DEBOUNCE_MS
	);

	const handleToggleSpeechInput = () => {
		if (!isMicrophoneAvailable) {
			return;
		}

		listening
			? SpeechRecognition.stopListening()
			: SpeechRecognition.startListening();
	};

	const handleResetSearch = () => {
		updateSearchQuery('');
	};

	const closeBtnClasses = cn('filter__btn', 'filter__btn--close', {
		'filter__btn--pad-right': isFullSupportSpeechRecognition,
	});

	return (
		<InputGroup className="filter__group">
			<Form.Control
				ref={searchRef}
				aria-label={intl.formatMessage({ id: MESSAGES.SEARCH })}
				className="filter__input"
				placeholder={intl.formatMessage({ id: MESSAGES.SEARCH }) + '...'}
				type="text"
				onChange={handleSearchChange}
			/>
			{searchRef.current?.value && (
				<CloseButton
					className={closeBtnClasses}
					variant={isDarkTheme ? 'white' : undefined}
					onClick={handleResetSearch}
				/>
			)}
			{isFullSupportSpeechRecognition && (
				<Button
					active={listening}
					aria-label={intl.formatMessage({ id: MESSAGES.VOICE_INPUT })}
					className={listening ? 'filter__btn--pulse' : ''}
					disabled={isCanNotUseSpeechRecognition}
					variant="outline-primary"
					onClick={handleToggleSpeechInput}
				>
					<SvgIcon
						height={18}
						variant={
							isCanNotUseSpeechRecognition
								? SVG_ICON_VARIANTS.MICROPHONE_OFF
								: SVG_ICON_VARIANTS.MICROPHONE_ON
						}
						width={18}
					/>
				</Button>
			)}
		</InputGroup>
	);
};
