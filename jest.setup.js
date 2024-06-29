// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { GetEnvironments } from './src/helpers/getEnvironments';
require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    GetEnvironments: () => ({ ...process.env })
}));