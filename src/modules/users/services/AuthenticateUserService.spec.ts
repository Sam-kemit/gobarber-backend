// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashPovider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHshProvider = new FakeHashPovider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHshProvider,
        );

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHshProvider,
        );

        const user = await createUser.execute({
            name: 'Samuel Kueta',
            email: 'samk@kk.fm',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'samk@kk.fm',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user ', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHshProvider = new FakeHashPovider();

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHshProvider,
        );

        expect(
            authenticateUser.execute({
                email: 'samk@kk.fm',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHshProvider = new FakeHashPovider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHshProvider,
        );

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHshProvider,
        );

        await createUser.execute({
            name: 'Samuel Kueta',
            email: 'samk@kk.fm',
            password: '123456',
        });

        expect(
            authenticateUser.execute({
                email: 'samk@kk.fm',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
