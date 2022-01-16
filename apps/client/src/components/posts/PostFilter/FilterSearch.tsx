import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { LOCALES } from '../../../i18n/locales';
import { MESSAGES } from '../../../i18n/types';
import { selectActiveFeedId } from '../../../store/selectors/contentSelectors';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { updateFilterQuery } from '../../../store/slices/postsSlice';
import { debounce } from '../../../utils/perfomance';
import SvgIcon from '../../UI/SvgIcon';
import { SVG_ICON_VARIANTS } from '../../UI/SvgIcon/types';

interface FilterSearchProps {
	resetActivePage: () => void;
}

const SEARCH_DEBOUNCE_MS = 300;

const FilterSearch: FC<FilterSearchProps> = ({ resetActivePage }) => {
	const searchRef = useRef<HTMLInputElement | null>(null);

	const {
		transcript,
		listening,
		browserSupportsSpeechRecognition,
		isMicrophoneAvailable,
	} = useSpeechRecognition();

	const { lang } = useTypedSelector(selectSettings);
	const activeFeedId = useTypedSelector(selectActiveFeedId);

	const dispatch = useTypedDispatch();

	const intl = useIntl();

	const isFullSupportSpeechRecognition =
		browserSupportsSpeechRecognition && lang === LOCALES.ENGLISH;

	const isCanNotUseSpeechRecognition =
		!isMicrophoneAvailable || !navigator.onLine;

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

			dispatch(updateFilterQuery(newSearchQuery));

			searchRef.current.value = newSearchQuery;

			resetActivePage();
		}
	}, [transcript]);

	const handleSearchChange = debounce((evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;

		dispatch(updateFilterQuery(value));

		resetActivePage();
	}, SEARCH_DEBOUNCE_MS);

	const handleToggleSpeechInput = () => {
		if (!isMicrophoneAvailable) {
			return;
		}

		listening
			? SpeechRecognition.stopListening()
			: SpeechRecognition.startListening();
	};

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

export default FilterSearch;
