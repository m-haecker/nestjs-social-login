import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

import { AppConfig } from '../../config/interfaces';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(
		private configService: ConfigService<AppConfig>,
		private usersService: UsersService,
	) {
		super({
			clientID: configService.get<string>('auth.github.clientId'),
			clientSecret: configService.get<string>('auth.github.clientSecret'),
			callbackURL: configService.get<string>('auth.github.callbackURL'),
			scope: ['public_profile'],
		});
	}

	async validate(accessToken: string, _refreshToken: string, profile: Profile) {
		// For each strategy, Passport will call the verify function (implemented with this
		// `validate()` method in @nestjs/passport) using an appropriate strategy-specific set of
		// parameters. For the passport-github strategy Passport expects a `validate()` method with
		// the following signature:
		//   `validate(accessToken: string, refreshToken: string, profile: Profile): any`
		// As you can see from this, `validate()` receives the access token and optional refresh
		// token, as well as profile which contains the authenticated user's GitHub profile.
		// We can pass these information to find or create the user in our system.
		// The Passport library expects this method to return a full user if the validation
		// succeeds, or a null if it fails. When returning a user, Passport will complete its tasks
		// (e.g., creating the user property on the Request object), and the request
		// handling pipeline can continue.

		const { id } = profile;
		const user = await this.usersService.findOrCreate(id, 'github');
		if (!user) {
			// TODO Depending on the concrete implementation of findOrCreate(), throwing the
			// UnauthorizedException here might not make sense...
			throw new UnauthorizedException();
		}
		return user;
	}
}
