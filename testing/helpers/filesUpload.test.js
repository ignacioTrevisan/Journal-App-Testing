import { v2 as cloudinary } from 'cloudinary'
import { FilesUpload } from '../../src/helpers/fileUpload';


cloudinary.config({
    cloud_name: 'nachotrevisan',
    api_key: '843785223879488',
    api_secret: 'cvzlO0itKd4m6CHKAmq6Sl9QYcw',
    secure: true,
})

describe('Testing a <FilesUpload />', () => {
    test('debe subir la imagen correctamente', async () => {

        const imageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgu3VqDXPU6m8L-ERGKAy2VmGG4hNgz8b4HQ&s';
        const resp = await fetch(imageURL);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        const url = await FilesUpload(file);

        expect(typeof url).toBe('string');
        const segments = url.split('/');
        const id = segments[segments.length - 1].replace('.jpg', '');
        console.log(id);
        await cloudinary.api.delete_resources([`jorunal-app/${id}`]);
    })

    test('Debe retornar null', async () => {
        const file = new File([], 'foto.jpg');
        const url = await FilesUpload(file);
        expect(url).toBe(null);
    })
})