/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import TagList from '@components/form/list';
import { useTag } from '@contexts/tag.context';
import TagForm from '@components/form/tag/tag-form';
import { default as ITag } from '@interfaces/tag';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Divider, Paper } from '@mui/material';

export default function Tag() {
    const { tags, setTag, deleteTag } = useTag();
    useEffect(() => {
        const getAll = async () => {
            const response = await fetch('/api/tag');
            if (response.ok) {
                const result = ((await response.json()) as { data: ITag[] }).data;
                result.forEach((tag, index) => {
                    setTag(tag);
                });
            }
        }
        getAll();
    }, []);
    return (
        <Box component="section" sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1
        }}>
            <TagForm setTag={setTag} />
            <TagList tags={tags} deleteTag={deleteTag} />
        </Box>
    );
}
