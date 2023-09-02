"use client";

import { useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";

import { PortalWorld } from "./PortalWorld";

export type Active = "ocean" | "park" | "metro" | null;

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

  const zoomDistance = active ? 1 : 10;

  return (
    <>
      <color args={["white"]} attach="background" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI * 1.5}
        minPolarAngle={Math.PI / 6}
        maxAzimuthAngle={0.5}
        minAzimuthAngle={-0.5}
        minDistance={zoomDistance}
        maxDistance={zoomDistance}
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
