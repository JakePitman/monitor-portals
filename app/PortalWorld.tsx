import { useEffect, useRef } from "react";
import {
  MeshPortalMaterial,
  PortalMaterialType,
  useTexture,
  Text3D,
  Center,
  Float,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

import { Active } from "./Experience";

type Props = {
  mapPath: string;
  name: NonNullable<Active>;
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<Active>>;
  position: [number, number, number];
};

export const PortalWorld = ({
  mapPath,
  name,
  active,
  setActive,
  position,
}: Props) => {
  const map = useTexture(mapPath);
  const isActive = name === active;
  const meshRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<PortalMaterialType>(null);
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    meshRef.current?.lookAt(camera.position);
  }, []);

  useFrame((_state, delta) => {
    const worldOpen = isActive;
    if (worldOpen) {
      setTimeout(() => {
        portalRef.current &&
          easing.damp(portalRef.current, "blend", 1, 0, delta);
      }, 700);
    } else {
      portalRef.current && easing.damp(portalRef.current, "blend", 0, 0, delta);
    }
  });

  return (
    <>
      <mesh
        onDoubleClick={() => setActive(isActive ? null : name)}
        position={position}
        ref={meshRef}
        name={name}
      >
        <planeGeometry args={[5, 10]} />
        <MeshPortalMaterial ref={portalRef}>
          <ambientLight intensity={1} />

          {/* TODO: Try adding a portal back to the room.
          Set pos-z to a positive number,
          so it's behind the camera after zooming*/}
          <mesh position={[0, 0, 2]} rotation={[0, Math.PI, 0]}>
            <planeGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
          <mesh>
            <sphereGeometry args={[10, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
    </>
  );
};
