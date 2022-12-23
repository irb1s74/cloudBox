import { FC } from 'react'
import classNames from 'classnames'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import logo from 'shared/assets/img/cloud-logo.png'

interface LogoProps {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link to={'/recent'}>
      <div className={classNames(styles.Logo, {}, [className])}>
          <img
            loading='lazy'
            src={logo}
            width='30'
            height='30'
            alt='cloud Logo'
          />
          <div className={styles.Logo__name}>
            cloudBox.
          </div>
        </div>
    </Link>
  )
}
