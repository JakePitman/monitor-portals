import { Float, useGLTF, useTexture } from "@react-three/drei";
import { BackSide } from "three";

import { Active } from "./Experience";
type Props = {
  setActive: React.Dispatch<React.SetStateAction<Active>>;
};

export const RoomReverse = ({ setActive }: Props) => {
  const { nodes } = useGLTF("/room-reverse.glb");
  const roomReverseTexture = useTexture("/baked-reverse.jpg");
  roomReverseTexture.flipY = false;
  return (
    <>
      {/* Transparent mesh (for doubleClicking) */}
      <mesh
        onDoubleClick={() => setActive(null)}
        position={[-1.2, 1.5, 9.8]}
        rotation={[0, Math.PI, 0]}
        scale={13}
      >
        <planeGeometry />
        <meshPhongMaterial opacity={0} transparent />
      </mesh>
      {/* Backdrop */}
      <mesh position={[-20, 3.2, 67.7]} rotation={[0, -0.35, 0]} scale={70}>
        <planeGeometry />
        <meshBasicMaterial color="#323b4a" side={BackSide} />
      </mesh>

      <Float floatIntensity={0.5} rotationIntensity={0.5}>
        <mesh
          geometry={nodes.merged.geometry}
          scale={2}
          rotation={[-0.05, 2.96, 0.0]}
          position={[-4.24, -3.3, 27.9]}
        >
          <meshStandardMaterial map={roomReverseTexture} toneMapped={false} />
        </mesh>
      </Float>
    </>
  );
};
