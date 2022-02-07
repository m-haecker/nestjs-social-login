import { AppConfig } from './interfaces';

export default (): AppConfig => ({
	port: parseInt(process.env.PORT) || 5000,

	auth: {
		jwt: {
			secret: process.env.JWT_SECRET,
			expiresInSeconds: parseInt(process.env.JWT_EXPIRATION_TIME_SECONDS) || 900,
		},
		github: {
			clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
			clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
			callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
		},
	},
});
