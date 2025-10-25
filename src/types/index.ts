export interface UserType {
	// id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone?: string;
	address: AddressType;
}

export interface AddressType {
	// id: number;
	// user_id: number;
	street?: string;
	city: string;
	state: string;
	zip_code: string;
	country: string;
}
