// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProvider', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviders = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Samuel Kueta',
            email: 'samk@kk.fm',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Samuel Exoussia',
            email: 'same@kk.fm',
            password: '123456',
        });

        const loggerUser = await fakeUsersRepository.create({
            name: 'Samuel Amarelinho',
            email: 'sama@kk.fm',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggerUser.id,
        });

        expect(providers).toStrictEqual([user1, user2]);
    });
});
