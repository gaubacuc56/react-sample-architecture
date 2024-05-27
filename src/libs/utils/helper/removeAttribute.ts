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
