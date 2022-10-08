import { truncateText } from './text';

it('truncateText', () => {
	expect(truncateText('kek')).toBe('kek');
});
