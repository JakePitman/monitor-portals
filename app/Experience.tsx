"use client";

import { useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";

import { PortalWorld } from "./PortalWorld";

export type Active = "ocean" | "park" | "metro" | null;

const activeControlProps = {
  maxPolarAngle: Math.PI * 2,
  minPolarAngle: Math.PI * -2,
  maxAzimuthAngle: 100,
  minAzimuthAngle: -100,
  minDistance: -Infinity,
  maxDistance: 1,
};
const inactiveControlProps = {
  maxPolarAngle: Math.PI * 1.5,
  minPolarAngle: Math.PI / 6,
  maxAzimuthAngle: 0.5,
  minAzimuthAngle: -0.5,
  minDistance: 10,
  maxDistance: 10,
};

export const Experience = () => {
  const [active, setActive] = useState<Active>(null);
  const controlsRef = useRef<CameraControls>(null);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active)?.getWorldPosition(targetPosition);
      const { x, y, z } = targetPosition;
      const xOffset = x === 0 ? 0 : x > 0 ? -1 : 1;
      controlsRef.current?.setLookAt(x + xOffset, y, z + 1, x, y, z, true);
    } else {
      controlsRef.current?.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  const minZoomDistance = active ? -Infinity : 10;
  const maxZoomDistance = active ? 1 : 10;

  return (
    <>
      <color args={["white"]} attach="background" />
      <CameraControls
        ref={controlsRef}
        {...(!!active ? activeControlProps : inactiveControlProps)}
      />
      <ambientLight intensity={1} />

      <PortalWorld
        position={[-8, 0, 0]}
        mapPath="/ocean.jpeg"
        name="ocean"
        active={active}
        setActive={setActive}
      />
      <PortalWorld
        position={[0, 3, 0]}
        mapPath="/park.jpeg"
        name="park"
        active={active}
        setActive={setActive}
      />
      <PortalWorld
        position={[8, 0, 0]}
        mapPath="/metropolis.jpeg"
        name="metro"
        active={active}
        setActive={setActive}
      />
    </>
  );
};
