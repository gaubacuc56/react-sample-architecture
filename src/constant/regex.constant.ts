export const Regex = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	number_only: /^\d+$/,
	url: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
	phone: /^\+?[1-9]\d{1,14}$/, // E.164 format
	password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Minimum 8 characters, at least one letter and one number
	username: /^[a-zA-Z0-9_]{3,16}$/, // 3-16 characters, letters, numbers, and underscores
};
