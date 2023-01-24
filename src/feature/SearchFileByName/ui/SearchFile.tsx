import { IconButton, InputBase, Paper } from '@mui/material';
import { IoSearch } from 'react-icons/io5';
import { ChangeEvent, useRef } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

export const SearchFile = () => {
    const fileName = useRef('');
    const navigate = useNavigate();

    const handleOnSearch = () => {
        navigate({
            pathname: '',
            search: `?${createSearchParams({
                name: `${fileName.current}`,
            })}`,
        });
    };

    const handleOnChangeFileName = (event: ChangeEvent<HTMLInputElement>) => {
        fileName.current = event.target.value;
    };
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
            }}
        >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Искать" />
            <IconButton
                color="primary"
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
            >
                <IoSearch />
            </IconButton>
        </Paper>
    );
};
