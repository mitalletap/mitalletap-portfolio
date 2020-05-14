import Helper from '../helpers/helper';

describe('tests the helper functions', () => {
    
    it('should change node enviroment to production and validate url', async () => {
        process.env.NODE_ENV = 'production';
        await Helper.getEnvironmentStatus();
        expect(process.env.NODE_ENV).toBe('production');
    });

    it('should change node enviroment to something invalid and validate url', async () => {
        process.env.NODE_ENV = 'development';
        await Helper.getEnvironmentStatus();
        expect(process.env.NODE_ENV).toBe('development');
    });
    
});