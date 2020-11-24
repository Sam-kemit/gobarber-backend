// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashPovider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHshProvider: FakeHashPovider;
let authenticateUser: AuthenticateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHshProvider = new FakeHashPovider();

        // createUser = new CreateUserService(
        //     fakeUsersRepository,
        //     fakeHshProvider,
        // );

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHshProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
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
        await expect(
            authenticateUser.execute({
                email: 'samk@kk.fm',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'Samuel Kueta',
            email: 'samk@kk.fm',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'samk@kk.fm',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
