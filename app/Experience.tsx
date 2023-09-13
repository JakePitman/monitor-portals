"use client";

import { useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls, useHelper } from "@react-three/drei";

import { PortalWorld } from "./PortalWorld";
import { Phone } from "./Phone";
import { Room } from "./Room";

export type Active = "ocean" | "park" | "snow" | null;

const activeControlProps = {
  maxPolarAngle: Math.PI * 2,
  minPolarAngle: Math.PI * -2,
  maxAzimuthAngle: 100,
  minAzimuthAngle: -100,
  minDistance: -Infinity,
  maxDistance: 1,
};
const inactiveControlProps = {
  maxPolarAngle: Math.PI / 1.5,
  minPolarAngle: Math.PI / 6,
  maxAzimuthAngle: 1,
  minAzimuthAngle: -1,
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
      const isCenterPhone = x < 2 && x > -2;
      const xOffset = isCenterPhone ? 0 : x > 0 ? -1 : 1;
      controlsRef.current?.setLookAt(x + xOffset, y, z + 1, x, y, z, true);
    } else {
      controlsRef.current?.setLookAt(0, -4, 10, 0, -1, 0, true);
    }
  }, [active]);

  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  useHelper(directionalLightRef, THREE.DirectionalLightHelper);

  return (
    <>
      <color args={["white"]} attach="background" />
      <CameraControls
        ref={controlsRef}
        {...(!!active ? activeControlProps : inactiveControlProps)}
      />
      <ambientLight />
      <directionalLight
        ref={directionalLightRef}
        position={[0, 8, 10]}
        intensity={5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={6}
        shadow-camera-far={30}
        shadow-camera-top={14}
        shadow-camera-right={14}
        shadow-camera-bottom={-6}
        shadow-camera-left={-14}
      />

      <Room />

      <Phone
        name="park"
        position={[0, 3, -4]}
        active={active}
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
        name="snow"
        position={[-8, 2, -4]}
        active={active}
        renderPortal={(zOffset) => (
          <PortalWorld
            zOffset={zOffset}
            mapPath="/snow.jpeg"
            name="snow"
            active={active}
            setActive={setActive}
          />
        )}
      />

      <Phone
        name="ocean"
        position={[8, 2, -4]}
        active={active}
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
    </>
  );
};
