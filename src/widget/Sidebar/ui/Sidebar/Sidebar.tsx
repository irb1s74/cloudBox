import { FC } from 'react'
import classNames from 'classnames'
import styles from '../Sidebar.module.scss'
import { SidebarButtons } from '../SidebarButtons/SidebarButtons'
import { SidebarNavigation } from '../SidebarNavigation/SidebarNavigation'
import { SidebarUsage } from '../SidebarUsage/SidebarUsage'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => (
    <div className={classNames(styles.Sidebar, {}, [className])}>
      <SidebarButtons/>
      <SidebarNavigation/>
      <SidebarUsage/>
    </div>
  )
