import { memo, useState } from 'react';
import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import classNames from 'classnames';

interface DiskFiltersProps {
    selectedSort: string;
    selectedOptionSort: boolean;
    handleSelectSort: (event: SelectChangeEvent) => void;
}

export const DiskFilters = memo((props: DiskFiltersProps) => {
    const { selectedSort, selectedOptionSort, handleSelectSort } = props;
    const [sortOpen, setSortOpen] = useState(false);

    const toggleSort = () => {
        setSortOpen(!sortOpen);
    };

    return (
        <Stack
            sx={{ pr: '10px', pl: '10px', pb: '15px', width: '100%' }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <FormControl sx={{ m: 1, minWidth: 230 }}>
                <InputLabel>Сортировать по</InputLabel>
                <Select
                    value={selectedSort}
                    open={sortOpen}
                    onClose={toggleSort}
                    onOpen={toggleSort}
                    onChange={handleSelectSort}
                    label="Сортировать по"
                >
                    <MenuItem value="name">Названию</MenuItem>
                    <MenuItem value="size">Размеру</MenuItem>
                    <MenuItem value="createdAt">Дате изменения</MenuItem>
                    <Divider />
                    <MenuItem
                        className={classNames({
                            'Mui-selected': selectedOptionSort,
                        })}
                        value="ascending"
                    >
                        Возрастанию
                    </MenuItem>
                    <MenuItem
                        className={classNames({
                            'Mui-selected': !selectedOptionSort,
                        })}
                        value="descending"
                    >
                        Убыванию
                    </MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
});
