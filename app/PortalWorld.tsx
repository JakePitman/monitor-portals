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
import { Message } from "./Message";

type Props = {
  mapPath: string;
  name: NonNullable<Active>;
  active: Active;
  setActive: React.Dispatch<React.SetStateAction<Active>>;
  zOffset: number;
  messages: string[];
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
  messages,
}: Props) => {
  const map = useTexture(mapPath);
  const isActive = name === active;
  const portalRef = useRef<PortalMaterialType>(null);
  const openSphere = useGLTF("/open-sphere.glb");
  const { nodes } = useGLTF("/room-reverse.glb");
  const roomReverseTexture = useTexture("/baked-reverse.jpg");
  roomReverseTexture.flipY = false;

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
        onDoubleClick={() => setActive(name)}
        position={[-1.85, -4.4, zOffset]}
      >
        {messages.map((message, i) => (
          <Message text={message} iteration={i} key={i} />
        ))}
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
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>

          {/* Room */}
          {isActive && (
            <>
              {/* Transparent mesh (for doubleClicking) */}
              <mesh
                onClick={() => setActive(null)}
                position={[-1.2, 1.5, 9.8]}
                rotation={[0, Math.PI, 0]}
                scale={13}
              >
                <planeGeometry />
                <meshPhongMaterial opacity={0} transparent />
              </mesh>
              {/* Backdrop */}
              <mesh
                position={[-20, 3.2, 67.7]}
                rotation={[0, -0.35, 0]}
                scale={52}
              >
                <planeGeometry />
                <meshBasicMaterial color="#323b4a" side={THREE.BackSide} />
              </mesh>

              <Float floatIntensity={0.5} rotationIntensity={0.5}>
                <mesh
                  geometry={nodes.merged.geometry}
                  scale={2}
                  rotation={[-0.05, 2.96, 0.0]}
                  position={[-4.24, -3.3, 28.5]}
                >
                  <meshStandardMaterial
                    map={roomReverseTexture}
                    toneMapped={false}
                  />
                </mesh>
              </Float>
            </>
          )}
        </MeshPortalMaterial>
      </mesh>
    </>
  );
};
