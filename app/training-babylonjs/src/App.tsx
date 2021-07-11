import React from 'react'
import { WebGLRenderer as Canvas } from './components/WebGLRenderer'

export const App: React.FC = () => {
  return (
    <div>
      <Canvas />
    </div>
  )
}