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
    portalRef.current &&
      easing.damp(portalRef.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <>
      <mesh
        onDoubleClick={() => setActive(isActive ? null : name)}
        position={position}
        ref={meshRef}
        name={name}
      >
        <planeGeometry args={[5, 4]} />
        <MeshPortalMaterial ref={portalRef}>
          <ambientLight intensity={1} />

          <Center bottom>
            <Float>
              <Text3D font="/Anton_Regular.json">
                {name}
                <meshNormalMaterial />
              </Text3D>
            </Float>
          </Center>
          <mesh>
            <sphereGeometry args={[10, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
    </>
  );
};
