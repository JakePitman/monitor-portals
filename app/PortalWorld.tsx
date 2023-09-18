import { useState, useRef } from "react";
import {
  MeshPortalMaterial,
  PortalMaterialType,
  useTexture,
  useGLTF,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BackSide, Shape } from "three";
import { easing } from "maath";

import { Active } from "./Experience";
import { Message } from "./Message";
import { RoomReverse } from "./RoomReverse";

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
  const shape = new Shape();
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
  const [isHovered, setIsHovered] = useState(false);
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
        onDoubleClick={() => {
          setActive(name);
          setTimeout(() => {
            setIsHovered(false);
          }, 300);
        }}
        position={[-1.85, -4.4, zOffset]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {messages.map((message, i) => (
          <Message text={message} iteration={i} key={i} isHovered={isHovered} />
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
            <meshStandardMaterial map={map} side={BackSide} />
          </mesh>

          {/* Room */}
          {isActive && <RoomReverse setActive={setActive} />}
        </MeshPortalMaterial>
      </mesh>
    </>
  );
};
