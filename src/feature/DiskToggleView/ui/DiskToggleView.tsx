import { memo, MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { HiViewGrid, HiViewList } from 'react-icons/hi';

interface DiskToggleViewProps {
    viewType: string;
    handleToggleView: (
        event: MouseEvent<HTMLElement>,
        selectedViewType: string,
    ) => void;
}

export const DiskToggleView = memo((props: DiskToggleViewProps) => {
    const { viewType, handleToggleView } = props;

    return (
        <ToggleButtonGroup
            value={viewType}
            onChange={handleToggleView}
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
    );
});
