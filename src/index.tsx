import React from 'react'
import { render } from 'react-dom'
import App from './app/infrastructure/ui/App'
import './app/infrastructure/ui/styles/index.scss'

const RootComponent = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const $rootContainer = document.getElementById('root') ?? document.createElement('div')
const $bodyElement = document.body

$rootContainer.id = 'root'

if (!$bodyElement.contains($rootContainer)) {
  $bodyElement.appendChild($rootContainer)
}

render(RootComponent, $rootContainer)
