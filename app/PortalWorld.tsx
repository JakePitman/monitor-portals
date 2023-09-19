import { useState, useRef, useMemo } from "react";
import {
  Sparkles,
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
  sparkleRGBs: {
    red: { min: number; max: number };
    green: { min: number; max: number };
    blue: { min: number; max: number };
  };
  sparkleOffset: {
    [key: string]: number;
  };
  sparkleTransitionSpeed: number;
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

const sparklesCount = 500;
const sparkleSizes = new Float32Array(sparklesCount);
const maxSize = 5;
const minSize = 3;
for (let i = 0; i < sparklesCount; i++) {
  sparkleSizes[i] = Math.random() * (maxSize - minSize) + minSize;
}

export const PortalWorld = ({
  mapPath,
  name,
  active,
  setActive,
  zOffset,
  messages,
  sparkleRGBs,
  sparkleOffset,
  sparkleTransitionSpeed,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const map = useTexture(mapPath);
  const isActive = name === active;
  const portalRef = useRef<PortalMaterialType>(null);
  const sparkleRef = useRef(null);
  const openSphere = useGLTF("/open-sphere.glb");

  const sparkleColors = useMemo(() => {
    const rgbArray = new Float32Array(sparklesCount * 3);
    const { red, green, blue } = sparkleRGBs;
    for (let i = 0; i < sparklesCount * 3; i++) {
      const i3 = i * 3;
      rgbArray[i3 + 0] = Math.random() * (red.max - red.min) + red.min; // set r
      rgbArray[i3 + 1] = Math.random() * (green.max - green.min) + green.min; // set g
      rgbArray[i3 + 2] = Math.random() * (blue.max - blue.min) + blue.min; // set b
    }
    return rgbArray;
  }, []);

  useFrame((_state, delta) => {
    const worldOpen = isActive;
    if (worldOpen) {
      setTimeout(() => {
        portalRef.current &&
          easing.damp(portalRef.current, "blend", 1, 0.2, delta);
      }, 600);
      Object.keys(sparkleOffset).forEach((key) => {
        sparkleRef.current &&
          easing.damp(
            sparkleRef.current.position,
            key,
            0,
            sparkleTransitionSpeed,
            delta
          );
      });
    } else {
      portalRef.current &&
        easing.damp(portalRef.current, "blend", 0, 0.01, delta);
      Object.keys(sparkleOffset).forEach((key) => {
        sparkleRef.current &&
          easing.damp(
            sparkleRef.current.position,
            key,
            // @ts-ignore
            sparkleOffset[key as keyof typeof sparkleOffset],
            sparkleTransitionSpeed,
            delta
          );
      });
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
          <RoomReverse setActive={setActive} isActive={isActive} />
          <Sparkles
            count={sparklesCount}
            position={[
              sparkleOffset.hasOwnProperty("x") ? sparkleOffset.x : 0,
              sparkleOffset.hasOwnProperty("y") ? sparkleOffset.y : 0,
              sparkleOffset.hasOwnProperty("z") ? sparkleOffset.z : 0,
            ]}
            size={sparkleSizes}
            scale={15}
            color={sparkleColors}
            ref={sparkleRef}
          />
        </MeshPortalMaterial>
      </mesh>
    </>
  );
};
