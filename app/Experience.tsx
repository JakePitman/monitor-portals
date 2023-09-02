"use client";

import { useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";

import { PortalWorld } from "./PortalWorld";
import { Phone } from "./Phone";

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
      controlsRef.current?.setLookAt(0, -4, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <color args={["white"]} attach="background" />
      <CameraControls
        ref={controlsRef}
        {...(!!active ? activeControlProps : inactiveControlProps)}
      />
      <Phone
        name="park"
        position={[0, 2, 0]}
        renderPortal={(zOffset) => (
          <PortalWorld
            zOffset={zOffset}
            mapPath="/park.jpeg"
            name="park"
            active={active}
            setActive={setActive}
          />
        )}
      />

      <Phone
        name="ocean"
        position={[-8, 1, 0]}
        renderPortal={(zOffset) => (
          <PortalWorld
            zOffset={zOffset}
            mapPath="/ocean.jpeg"
            name="ocean"
            active={active}
            setActive={setActive}
          />
        )}
      />

      <Phone
        name="metro"
        position={[8, 1, 0]}
        renderPortal={(zOffset) => (
          <PortalWorld
            zOffset={zOffset}
            mapPath="/metropolis.jpeg"
            name="metro"
            active={active}
            setActive={setActive}
          />
        )}
      />
    </>
  );
};
