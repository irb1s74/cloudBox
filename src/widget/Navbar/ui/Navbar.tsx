import { FC } from 'react'
import classNames from 'classnames'
import { Logo } from 'shared/ui/Logo/Logo'
import styles from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(styles.Navbar, {}, [className])}>
      <Logo />
    </div>
  )
}
