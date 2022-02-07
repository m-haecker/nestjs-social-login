import { Injectable } from '@nestjs/common';

import { AuthProvider, User } from '../shared';

@Injectable()
export class UsersService {
	async findOrCreate(userId: string, provider: AuthProvider): Promise<User> {
		// TODO Perform database lookup to extract more information about the user
		// or to create the user if the UserId is unknown to us.
		// For now, we'll skip this and always return the same dummy user, regardless of the `userId`.
		return {
			id: '42195',
			provider,
			providerId: '123',
			displayName: 'John Doe',
			photos: [{ value: 'https://avatars.githubusercontent.com/u/28536201' }],
		};
	}
}
