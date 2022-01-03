import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from './common/components'
import { ThumbsContextProvider } from './shared/contexts/ThumbsContext/ThumbsContext'

const Home = lazy(async () => await import('./common/pages/Home'))

function App() {
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
