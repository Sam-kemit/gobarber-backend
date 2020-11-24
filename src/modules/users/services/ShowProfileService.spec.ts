// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Samuel Kueta',
            email: 'samk@kk.fm',
            password: '123456',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('Samuel Kueta');
        expect(profile.email).toBe('samk@kk.fm');
    });

    it('should not be able to show the profile from non-existing user', async () => {
        expect(
            showProfile.execute({
                user_id: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
