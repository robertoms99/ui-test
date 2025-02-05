import React from 'react'
import { render } from 'react-dom'
import App from './app/App'
import './app/styles/index.scss'
import { initializeApp } from 'firebase/app'
import firebaseConfig from './app/config/env'

initializeApp(firebaseConfig)

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
