import { FC, Suspense } from 'react'
import classNames from 'classnames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widget/Navbar'
import { Sidebar } from 'widget/Sidebar'
import './styles/index.scss'

interface AppProps {
  className?: string
}

export const App: FC<AppProps> = ({ className }) => (
    <div className={classNames('app', {}, ['light'])}>
      <Suspense fallback=''>
        <Navbar />
        <div className='flex'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
