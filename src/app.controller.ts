import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() req: Request) {
		// Passport automatically creates a user object, based on the value we return from the
		// `JwtAuthStrategy#validate()` method, and assigns it to the Request object as `req.user`
		return req.user;
	}
}
