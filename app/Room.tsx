import { useGLTF, useTexture } from "@react-three/drei";

export const Room = () => {
  const { nodes } = useGLTF("/room.glb");
  const texture = useTexture("/baked.jpg");
  texture.flipY = false;
  return (
    <mesh
      scale={1.2}
      position={[0, -5, -14]}
      rotation={[0, Math.PI, 0]}
      geometry={nodes.merged.geometry}
      receiveShadow
    >
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
