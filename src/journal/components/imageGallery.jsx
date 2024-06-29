import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';

export const ImageGallery = () => {
    const { active } = useSelector(state => state.journal);
    return (
        <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={164}>
            {active.imageURL && active.imageURL.map((item) => (
                <ImageListItem key={active.title}>
                    <img srcSet={`${item}?w=164&h=164&fit=contain&auto=format&dpr=2 2x`}
                        src={`${item}?w=164&h=164&fit=contain&auto=format`}
                        alt={active.title}
                        loading="lazy"
                        sx={{ width: '100 %' }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

