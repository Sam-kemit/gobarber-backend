import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
    provider_id: string;
    day: number;
    year: number;
    month: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequestDTO): Promise<Appointment[]> {
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider(
                {
                    provider_id,
                    year,
                    month,
                    day,
                },
            );

            // console.log('Recover on database!');

            await this.cacheProvider.save(cacheKey, classToClass(appointments));
        }

        return appointments;
    }
}

export default ListProviderAppointmentsService;
