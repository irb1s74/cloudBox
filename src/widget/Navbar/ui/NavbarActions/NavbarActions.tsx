import React, { FC, useState } from 'react';
import { DropList } from 'shared/ui/DropList/DropList';
import { BiLogOut } from 'react-icons/bi';
import { Avatar, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { SearchFile } from 'feature/SearchFileByName';
import styles from '../Navbar.module.scss';

interface NavbarActionsProps {
    className?: string;
}

export const NavbarActions: FC<NavbarActionsProps> = ({ className }) => {
    const dispatch = useDispatch();
    const user = useSelector(getUserAuthData);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        dispatch(userActions.logout());
    };

    return (
        <>
            <div className={classNames(styles.NavbarActions, {}, [className])}>
                <SearchFile />
                <div onClick={handleClick} className={styles.NavbarAvatar}>
                    <Avatar src={user?.avatar ? user.avatar : undefined} />
                </div>
            </div>
            <DropList anchorEl={anchorEl} open={open} handleClose={handleClose}>
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <BiLogOut size={22} />
                    </ListItemIcon>
                    <ListItemText>Выйти</ListItemText>
                </MenuItem>
            </DropList>
        </>
    );
};
