import { FC, MouseEvent, memo, useState } from 'react';
import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import { HiViewGrid, HiViewList } from 'react-icons/hi';

interface DiskSettingProps {
    alignment: string;
    sort: string;
    optionSort: boolean;
    handleSelectSort: (event: SelectChangeEvent) => void;
    handleChange: (
        event: MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => void;
}

const DiskSetting: FC<DiskSettingProps> = (props) => {
    const { alignment, sort, optionSort, handleChange, handleSelectSort } =
        props;

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
                    open={sortOpen}
                    onClose={toggleSort}
                    onOpen={toggleSort}
                    onChange={handleSelectSort}
                    value={sort}
                    label="Сортировать по"
                >
                    <MenuItem value="name">Названию</MenuItem>
                    <MenuItem value="size">Размеру</MenuItem>
                    <MenuItem value="createdAt">Дате изменения</MenuItem>
                    <Divider />
                    <MenuItem
                        className={optionSort ? 'Mui-selected' : ''}
                        value="ascending"
                    >
                        Возрастанию
                    </MenuItem>
                    <MenuItem
                        className={!optionSort ? 'Mui-selected' : ''}
                        value="descending"
                    >
                        Убыванию
                    </MenuItem>
                </Select>
            </FormControl>
            <ToggleButtonGroup
                value={alignment}
                onChange={handleChange}
                exclusive
                aria-label="Medium sizes"
            >
                <ToggleButton value="grid">
                    <HiViewGrid />
                </ToggleButton>
                <ToggleButton value="list">
                    <HiViewList />
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default memo(DiskSetting);
