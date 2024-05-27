/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * This method supports comparing arrays, array buffers, booleans, date objects, error
 * objects, maps, numbers, objects, regexes, sets, strings, symbols, and typed arrays.
 * Object comparisons are performed by first comparing their constructors and own properties,
 * and if those comparisons are equal, their inherited properties are compared.
 *
 * Note: This method supports comparing functions by their `toString` representation,
 * but this might lead to unexpected results if a function relies on a closure.
 *
 * @param a The first value to compare.
 * @param b The second value to compare.
 * @param settings Comparison settings.
 *
 * @returns {boolean} Returns `true` if the values are deeply equivalent, else `false`.
 */
export function isEqual(
	a: any,
	b: any,
	settings?: { compareDateAndTime: boolean }
): boolean {
	if (a === b) return true;

	if (
		typeof a !== "object" ||
		a === null ||
		typeof b !== "object" ||
		b === null
	) {
		return false;
	}

	// Check for array types
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;

		for (let i = 0; i < a.length; i++) {
			if (!isEqual(a[i], b[i])) return false;
		}

		return true;
	}

	// Date comparison
	if (a instanceof Date && b instanceof Date) {
		if (settings?.compareDateAndTime) {
			return (
				a.toISOString().slice(0, 19) === b.toISOString().slice(0, 19)
			);
		}
		return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
	}

	const keysA: string[] = Object.keys(a);
	const keysB: string[] = Object.keys(b);

	if (keysA.length !== keysB.length) return false;

	for (const key of keysA) {
		if (!keysB.includes(key)) return false;
		if (typeof a[key] === "function" || typeof b[key] === "function") {
			if (a[key].toString() !== b[key].toString()) return false;
		} else {
			if (!isEqual(a[key], b[key])) return false;
		}
	}

	return true;
}
