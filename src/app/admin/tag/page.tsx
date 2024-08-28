'use client';
import { Container, Typography } from '@mui/material';
import TagProvider from '@providers/tag.provider';
import Tag from '@components/tag/tag';
import { useState } from 'react';
import Loading from '../../loading';

export default function Page() {
    return (
        <TagProvider>
            <Container maxWidth="md">
                <Typography variant="h6">Tags</Typography>
                <Tag />
            </Container>
        </TagProvider>
    );
};