import { IconButton, InputBase, Paper } from '@mui/material';
import { IoSearch } from 'react-icons/io5';
import { ChangeEvent, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

export const SearchFile = () => {
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();

    const handleOnSearch = () => {
        navigate({
            pathname: '/search',
            search: `?${createSearchParams({
                name: `${fileName}`,
            })}`,
        });
    };

    const handleOnChangeFileName = (event: ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
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
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={fileName}
                placeholder="Искать"
                onChange={handleOnChangeFileName}
            />
            <IconButton
                color="primary"
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={handleOnSearch}
            >
                <IoSearch />
            </IconButton>
        </Paper>
    );
};
