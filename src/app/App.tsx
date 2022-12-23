import { FC, Suspense } from 'react'
import classNames from 'classnames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widget/Navbar'
import './styles/index.scss'

interface AppProps {
  className?: string
}

export const App: FC<AppProps> = ({ className }) => {
  return (
    <div className={classNames('app', {}, ['light'])}>
      <Suspense fallback=''>
        <div className='flex'>
          <div className='flex-grow'>
            <Navbar />
            <AppRouter />
          </div>
        </div>
      </Suspense>
    </div>
  )
}
