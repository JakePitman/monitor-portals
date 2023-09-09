import { useRef } from "react";
import {
  MeshPortalMaterial,
  PortalMaterialType,
  useTexture,
  useGLTF,
  Float,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

import { Active } from "./Experience";

type Props = {
  mapPath: string;
  name: NonNullable<Active>;
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<Active>>;
  zOffset: number;
};

const eps = 0.00001;
function createShape(width: number, height: number, radius0: number) {
  const shape = new THREE.Shape();
  const radius = radius0 - eps;
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(
    width - radius * 2,
    height - radius * 2,
    eps,
    Math.PI / 2,
    0,
    true
  );
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
  return shape;
}

export const PortalWorld = ({
  mapPath,
  name,
  active,
  setActive,
  zOffset,
}: Props) => {
  const map = useTexture(mapPath);
  const isActive = name === active;
  const portalRef = useRef<PortalMaterialType>(null);
  const openSphere = useGLTF("/open-sphere.glb");

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
        position={[-1.85, -4.4, zOffset]}
      >
        <extrudeGeometry
          args={[
            createShape(3.7, 8.7, 0),
            { depth: 0, bevelEnabled: true, bevelSize: 0.5 },
          ]}
        />
        <MeshPortalMaterial ref={portalRef}>
          <ambientLight intensity={1.5} />

          {/* Sphere (environment) */}
          <mesh
            geometry={openSphere.scene.children[0].geometry}
            scale={10}
            rotation={[Math.PI, 0, 0]}
          >
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>

          {/* Room */}
          <mesh position={[0, 0, 0]} scale={30}>
            <boxGeometry />
            <meshBasicMaterial color="white" side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
    </>
  );
};
