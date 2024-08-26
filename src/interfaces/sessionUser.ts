export default interface SessionUser {
	id: number;
	username: string;
	email: string;
	role: number;
	adult: boolean;
	image?: string | null;
}
