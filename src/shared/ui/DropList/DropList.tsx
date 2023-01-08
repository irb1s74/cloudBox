import { Menu, MenuList } from '@mui/material'
import { FC, ReactNode } from 'react'

interface DropListProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export const DropList: FC<DropListProps> = ({
                                              anchorEl,
                                              open,
                                              handleClose,
                                              children,
                                            }) => (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MenuList sx={{ p: 0 }}>{children}</MenuList>
    </Menu>
  )
