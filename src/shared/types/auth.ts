/** Social login providers by which our users can authenticate themselves */
export type AuthProvider = 'github';

/** Claims contained in the JSON Web Token we issue to our authenticated users;
 * see https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields */
export type JwtPayload = {
	/** Internal user ID; we choose a property name of `sub` to hold our user ID value
	 * to be consistent with JWT standards */
	sub: string;

	/** Identifies the time at which the JWT was issued, e.g. 1644228687.
	 * This property is added automatically by passport-jwt. */
	iat?: number;

	/** Expiration time, e.g. 1644229587. This property is added automatically by passport-jwt. */
	exp?: number;

	/** e.g. "John Doe" */
	displayName: string;

	/** Profile photo URL */
	photo?: string;
};
