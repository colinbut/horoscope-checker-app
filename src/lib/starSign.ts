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

export function parseDateParts(
	dayText: string,
	monthText: string,
	yearText: string
): { month: number; day: number; year: number } | null {
	const day = Number.parseInt(dayText.trim(), 10);
	const month = Number.parseInt(monthText.trim(), 10);
	const year = Number.parseInt(yearText.trim(), 10);

	if ([day, month, year].some((n) => Number.isNaN(n))) {
		return null;
	}

	return { day, month, year };
}
