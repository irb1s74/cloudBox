import { FC } from 'react'
import classNames from 'classnames'
import styles from './Main.module.scss'

interface MainProps {
  className?: string
}

const Main: FC<MainProps> = ({ className }) => {
  return (
    <div className={classNames(styles.Main, {}, [className])}>
      Main
    </div>
  )
}
export default Main
