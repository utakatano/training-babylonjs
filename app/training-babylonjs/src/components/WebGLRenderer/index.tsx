import React, { useEffect, useRef } from 'react'
import * as BABYLON from 'babylonjs'

export const WebGLRenderer: React.FC = () => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)

  const createScene = (engineTarget: BABYLON.Engine, canvasElement: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engineTarget)
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene)
    camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl(canvasElement, false)
    
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
    const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE)
    sphere.position.y = 1

    const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false)
    return scene
  }

  useEffect(() => {
    if (refCanvas.current === null) return
    refCanvas.current.width = window.innerWidth
    refCanvas.current.height = window.innerHeight

    const engine = new BABYLON.Engine(refCanvas.current, true, {preserveDrawingBuffer: true, stencil: true})
    const scene = createScene(engine, refCanvas.current)

    engine.runRenderLoop(() => {
      scene.render()
    })

    window.addEventListener('resize', () => {
      if (refCanvas.current === null) return
      refCanvas.current.width = window.innerWidth
      refCanvas.current.height = window.innerHeight
      engine.resize()
    })
  }, [])

  return (
    <div>
      <canvas ref={refCanvas} />
    </div>
  )
}