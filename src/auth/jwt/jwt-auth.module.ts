import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfig } from '../../config/interfaces';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService<AppConfig>) => ({
				// available options: https://github.com/auth0/node-jsonwebtoken#usage
				secret: configService.get<string>('auth.jwt.secret'),
				signOptions: { expiresIn: configService.get<number>('auth.jwt.expiresInSeconds') },
			}),
			inject: [ConfigService],
		}),
	],
	providers: [JwtAuthStrategy, JwtAuthService],
	exports: [JwtAuthService],
})
export class JwtAuthModule {}
