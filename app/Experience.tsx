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
      controlsRef.current?.setLookAt(
        0,
        0,
        0,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current?.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <color args={["white"]} attach="background" />
      <CameraControls ref={controlsRef} />
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
