/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Checks if a value exists in an array or is equal to another value.
 *
 * This method supports checking if a value (`one`) exists within a target array (`ofTarget`),
 * or if it is equal to the target value when the target is not an array.
 *
 * @param one The value to check for.
 * @param ofTarget The target array or value to check against.
 *
 * @returns {boolean} Returns `true` if the value exists in the array or is equal to the target value, else `false`.
 */
export const arrayIndexOf = (one: any, ofTarget: any) => {
  if (Array.isArray(ofTarget)) {
    return ofTarget.indexOf(one) >= 0;
  }
  return one === ofTarget;
};

/**
 * Chains multiple functions together, ensuring they are executed sequentially.
 *
 * This method takes multiple functions (which may include `null` or `undefined` values)
 * and returns a single function that, when invoked, calls each of the provided functions
 * in order with the same arguments. If any non-function, non-null, or non-undefined values
 * are provided, an error is thrown.
 *
 * @param funcs The functions to chain together, along with possible `null` or `undefined` values.
 *
 * @returns {Function | undefined} Returns a single chained function, or `undefined` if no valid functions were provided.
 *
 * @throws {Error} Throws an error if any argument is not a function, `undefined`, or `null`.
 */
export const chainedFunction = <T = any>(...funcs: (T | null)[]) => {
  return funcs
    .filter((f) => f !== null && typeof f !== "undefined")
    .reduce((acc: any, f: any) => {
      if (typeof f !== "function") {
        throw new Error(
          "Invalid Argument Type, must only provide functions, undefined, or null."
        );
      }

      if (acc === undefined) {
        return f;
      }

      return function chainedFunction(this: any, ...args: any[]) {
        acc.apply(this, args);
        f.apply(this, args);
      };
    }, undefined);
};

/**
 * Generates a unique identifier string of specified length.
 *
 * This method creates a random string of alphanumeric characters
 * (both uppercase and lowercase letters, as well as digits).
 * The default length of the generated string is 10 characters, but this can be adjusted
 * by providing a different length as an argument.
 *
 * @param len The length of the unique identifier to generate. Defaults to 10.
 *
 * @returns {string} Returns a randomly generated unique identifier string.
 */
export const createUID = (len = 10) => {
  const buf = [];
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charlen = chars.length;
  const length = len;

  for (let i = 0; i < length; i++) {
    buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
  }
  return buf.join("");
};

/**
 * Creates a new object by removing specified attributes from the original object.
 *
 * This method takes an object and an array of keys to keep, and returns a new object
 * that only includes the specified keys. All other keys from the original object
 * are omitted.
 *
 * @param obj The original object from which attributes are to be removed.
 * @param keysToKeep An array of keys that should be keeped in the resulting object.
 *
 * @returns {Partial<T>} Returns a new object containing only the specified keys.
 */
export const removeAttribute = <T extends object>(
  obj: T,
  keysToKeep: (keyof T)[]
): Partial<T> => {
  const result: Partial<T> = {};
  Object.keys(obj).forEach((key) => {
    if (keysToKeep.includes(key as keyof T)) {
      result[key as keyof T] = obj[key as keyof T];
    }
  });
  return result;
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks if two values are the same value.
 *
 * This method performs a SameValue comparison, similar to `Object.is`.
 * It considers `-0` and `+0` as different and `NaN` as equal to `NaN`.
 *
 * @param x The first value to compare.
 * @param y The second value to compare.
 *
 * @returns {boolean} Returns `true` if the values are the same, else `false`.
 */

const is = (x: any, y: any) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y;
};

/**
 * Performs a shallow comparison between two objects to determine if they are equivalent.
 *
 * This method compares the own properties of two objects and determines if they are
 * shallowly equal. It does not perform deep comparisons of nested objects.
 *
 * @param objA The first object to compare.
 * @param objB The second object to compare.
 *
 * @returns {boolean} Returns `true` if the objects are shallowly equivalent, else `false`.
 */

export const shallowEqual = (objA: any, objB: any) => {
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i += 1) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
};

/**
 * Converts an object to a query string.
 *
 * This method takes an object and converts its key-value pairs into a URL-encoded query string.
 * It omits any key-value pairs where the value is `undefined`.
 *
 * @param params The object containing key-value pairs to be converted into a query string.
 *
 * @returns {string} Returns the URL-encoded query string.
 */

export const toQueryString = <T>(params: Partial<T>): string => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
};

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
