import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubOauthModule } from './auth/github/github-oauth.module';
import appConfig from './config/app.config';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }), GithubOauthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
