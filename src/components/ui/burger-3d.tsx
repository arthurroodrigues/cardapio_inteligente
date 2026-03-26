"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

interface Burger3DProps {
  className?: string
  speed?: number
}

const MODEL_URL = "/models/current-burger.glb"

export function Burger3D({ className = "", speed = 0.22 }: Burger3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
    camera.position.set(0, 0.4, 8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambient)

    const hemiLight = new THREE.HemisphereLight(0xfff2c4, 0x8f2000, 1.4)
    scene.add(hemiLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(6, 8, 10)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xffd36e, 1.6)
    rimLight.position.set(-5, 3, -6)
    scene.add(rimLight)

    const stage = new THREE.Group()
    scene.add(stage)

    const loader = new GLTFLoader()
    let burger: THREE.Group | null = null
    let animationId = 0
    let baseStageX = 0
    let baseStageY = 0
    let baseStageZ = 0

    const frameBurger = () => {
      const width = container.clientWidth || 1
      const height = container.clientHeight || width
      const aspect = width / height

      renderer.setSize(width, height)
      camera.aspect = aspect

      if (!burger) {
        camera.updateProjectionMatrix()
        return
      }

      stage.position.set(0, 0, 0)

      const box = new THREE.Box3().setFromObject(burger)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5)

      baseStageX = -center.x
      baseStageY = -center.y + 0.56
      baseStageZ = -center.z

      stage.position.set(baseStageX, baseStageY, baseStageZ)

      const fitHeightDistance = (size.y * 0.5) / Math.tan(halfFovY)
      const fitWidthDistance = (size.x * 0.5) / (aspect * Math.tan(halfFovY))
      const distance =
        Math.max(fitHeightDistance, fitWidthDistance) * 0.94 + size.z * 0.28

      camera.position.set(0, 0.52, distance)
      camera.near = Math.max(distance / 100, 0.1)
      camera.far = distance + size.z * 4 + 20
      camera.lookAt(0, 0.28, 0)
      camera.updateProjectionMatrix()
    }

    loader.load(
      MODEL_URL,
      (gltf) => {
        burger = gltf.scene

        burger.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = false
            child.receiveShadow = false
          }
        })

        const box = new THREE.Box3().setFromObject(burger)
        const size = box.getSize(new THREE.Vector3())
        const maxDimension = Math.max(size.x, size.y, size.z) || 1
        const scale = 3.85 / maxDimension

        burger.scale.setScalar(scale)
        burger.rotation.set(0.2, -0.72, -0.14)

        stage.add(burger)
        frameBurger()
      },
      undefined,
      (error) => {
        console.error("Nao foi possivel carregar o modelo do hamburguer.", error)
      },
    )

    const clock = new THREE.Clock()
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      if (burger && !prefersReducedMotion) {
        burger.rotation.y = -0.72 + elapsed * speed
        stage.position.set(
          baseStageX,
          baseStageY + Math.sin(elapsed * 1.4) * 0.04,
          baseStageZ,
        )
      } else if (burger) {
        stage.position.set(baseStageX, baseStageY, baseStageZ)
      }

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0
      const height = entries[0]?.contentRect.height ?? width
      if (!width || !height) return
      frameBurger()
    })

    resizeObserver.observe(container)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()

      stage.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()

          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose())
          } else {
            child.material.dispose()
          }
        }
      })

      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [speed])

  return <div ref={containerRef} className={`projection-root ${className}`} />
}
