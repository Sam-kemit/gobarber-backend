interface IMailConfig {
    driver: 'ethereal' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'samuel.kueta@kimpa.org',
            name: 'Samuel KUETA at Kimpa',
        },
    },
} as IMailConfig;
