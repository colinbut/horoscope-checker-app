const ZODIAC_SIGNS = [
	'Capricorn',
	'Aquarius',
	'Pisces',
	'Aries',
	'Taurus',
	'Gemini',
	'Cancer',
	'Leo',
	'Virgo',
	'Libra',
	'Scorpio',
	'Sagittarius'
] as const;

/** Last day of the sign that starts in each calendar month (Western tropical). */
const LAST_DAY_OF_SIGN_IN_MONTH = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];

export type StarSign = (typeof ZODIAC_SIGNS)[number];

export function getStarSign(month: number, day: number): StarSign {
	if (day <= LAST_DAY_OF_SIGN_IN_MONTH[month - 1]) {
		return ZODIAC_SIGNS[month - 1];
	}
	return ZODIAC_SIGNS[month % 12];
}

export function isValidDate(month: number, day: number, year: number): boolean {
	if (!Number.isInteger(month) || !Number.isInteger(day) || !Number.isInteger(year)) {
		return false;
	}
	if (month < 1 || month > 12 || day < 1 || year < 1) {
		return false;
	}
	const date = new Date(year, month - 1, day);
	return (
		date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
	);
}

/** Parse an HTML date input value (`YYYY-MM-DD`). */
export function parseBirthDate(value: string): { month: number; day: number; year: number } | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
	if (!match) {
		return null;
	}

	const year = Number.parseInt(match[1], 10);
	const month = Number.parseInt(match[2], 10);
	const day = Number.parseInt(match[3], 10);

	return { day, month, year };
}
