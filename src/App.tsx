import { Suspense } from 'react'
import './App.css'
import Layout from './layout/layout'
import Loader from './shared/components/loader'

function App() {

  return (
    <Suspense fallback={<Loader />}>
          <Layout/>
    </Suspense>
  )
}

export default App
