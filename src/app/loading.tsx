import { Box, Container } from '@mui/material';
import Loader from '@components/loader/loader';

export default function Loading() {
    return (
        <Container component="main" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100% - 64px)',
        }}>
            <Loader />
        </Container>
    );
}