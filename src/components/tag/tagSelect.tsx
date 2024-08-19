import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tag from '@interfaces/tag';

interface TagSelectProps {
    tags: Tag[];
    selectedTags: string[];
    onTagChange: (event: SelectChangeEvent<string[]>) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const TagSelect: React.FC<TagSelectProps> = ({ tags, selectedTags, onTagChange }) => {
    const theme = useTheme();

    return (
        <FormControl sx={{ width: 300 }}>
            <InputLabel id="tag-select-label">Tags</InputLabel>
            <Select
                labelId="tag-select-label"
                id="tag-select"
                multiple
                value={selectedTags}
                onChange={onTagChange}
                input={<OutlinedInput label="Tags" />}
                MenuProps={MenuProps}
            >
                {tags.map((tag) => (
                    <MenuItem
                        key={tag.id}
                        value={tag.name}
                        style={{
                            fontWeight: selectedTags.indexOf(tag.name) === -1
                                ? theme.typography.fontWeightRegular
                                : theme.typography.fontWeightMedium,
                        }}
                    >
                        {tag.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TagSelect;
