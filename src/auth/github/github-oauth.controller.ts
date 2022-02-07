import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { User } from '../../shared';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GithubOauthGuard } from './github-oauth.guard';

@Controller('auth/github')
export class GithubOauthController {
	constructor(private jwtAuthService: JwtAuthService) {}

	@Get()
	@UseGuards(GithubOauthGuard)
	async githubAuth() {
		// With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
		// automatically provisioned for us when we extended the passport-github strategy.
		// The Guard initiates the passport-github flow.
	}

	@Get('callback')
	@UseGuards(GithubOauthGuard)
	async githubAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		// Passport automatically creates a `user` object, based on the return value of our
		// GithubOauthStrategy#validate() method, and assigns it to the Request object as `req.user`

		const user = req.user as User;

		// TODO delete
		console.log(
			`${this.githubAuthCallback.name}(): req.user = ${JSON.stringify(user, null, 4)}`,
		);

		const { accessToken } = this.jwtAuthService.login(user);
		res.cookie('jwt', accessToken);
		return { access_token: accessToken };
	}
}
