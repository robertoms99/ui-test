import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from './common/components'
import { ThumbsContextProvider } from './shared/contexts/ThumbsContext/ThumbsContext'
import { v4 as uuidv4 } from 'uuid'
import { useStorage } from './shared/hooks'

const Home = lazy(async () => await import('./common/pages/Home'))

function App() {
  useStorage('user-id', uuidv4())

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <ThumbsContextProvider>
            <Switch>
              <Route element={<Home />} path="/" />
              <Route path="*" element={<Navigate to="/" />} />
            </Switch>
          </ThumbsContextProvider>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
