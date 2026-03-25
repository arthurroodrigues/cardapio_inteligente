"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface Burger3DProps {
  className?: string
  speed?: number
}

export function Burger3D({ className = "", speed = 0.35 }: Burger3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0.4, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1)
    keyLight.position.set(3, 4, 6)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6)
    fillLight.position.set(-4, 2, -4)
    scene.add(fillLight)

    const burger = new THREE.Group()

    const bunMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9a066,
      roughness: 0.7,
      metalness: 0.1,
    })
    const bunTopGeometry = new THREE.SphereGeometry(
      1.45,
      32,
      24,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2,
    )
    const bunTop = new THREE.Mesh(bunTopGeometry, bunMaterial)
    bunTop.position.y = 0.75
    bunTop.scale.set(1, 0.6, 1)

    const bunBottomGeometry = new THREE.CylinderGeometry(1.45, 1.55, 0.35, 32)
    const bunBottom = new THREE.Mesh(bunBottomGeometry, bunMaterial)
    bunBottom.position.y = -1.0

    const pattyMaterial = new THREE.MeshStandardMaterial({
      color: 0x5b3a2c,
      roughness: 0.9,
      metalness: 0.05,
    })
    const pattyGeometry = new THREE.CylinderGeometry(1.35, 1.35, 0.28, 32)
    const patty = new THREE.Mesh(pattyGeometry, pattyMaterial)
    patty.position.y = -0.45

    const cheeseMaterial = new THREE.MeshStandardMaterial({
      color: 0xffc72c,
      roughness: 0.6,
      metalness: 0.1,
    })
    const cheeseGeometry = new THREE.BoxGeometry(2.2, 0.05, 2.2)
    const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial)
    cheese.position.y = -0.2
    cheese.rotation.y = Math.PI / 4

    const lettuceMaterial = new THREE.MeshStandardMaterial({
      color: 0x5bbf4a,
      roughness: 0.7,
      metalness: 0.05,
    })
    const lettuceGeometry = new THREE.TorusGeometry(1.25, 0.12, 18, 64)
    const lettuce = new THREE.Mesh(lettuceGeometry, lettuceMaterial)
    lettuce.position.y = 0.05
    lettuce.rotation.x = Math.PI / 2

    burger.add(bunTop, bunBottom, patty, cheese, lettuce)
    burger.rotation.x = 0.12
    scene.add(burger)

    const clock = new THREE.Clock()
    let animationId = 0

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const animate = () => {
      const delta = clock.getDelta()
      if (!prefersReducedMotion) {
        burger.rotation.y += speed * delta
      }
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0
      const height = entries[0]?.contentRect.height ?? width
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    })

    resizeObserver.observe(container)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      burger.clear()
      bunTopGeometry.dispose()
      bunBottomGeometry.dispose()
      pattyGeometry.dispose()
      cheeseGeometry.dispose()
      lettuceGeometry.dispose()
      bunMaterial.dispose()
      pattyMaterial.dispose()
      cheeseMaterial.dispose()
      lettuceMaterial.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [speed])

  return <div ref={containerRef} className={`projection-root ${className}`} />
}
