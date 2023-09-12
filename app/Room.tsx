import { RoundedBox, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Desk = () => (
  <mesh position={[0, -7, -2]} receiveShadow>
    <RoundedBox args={[25, 2, 18]} radius={0.5} receiveShadow>
      <meshStandardMaterial color="white" />
    </RoundedBox>
  </mesh>
);

const coneGeometry = new THREE.ConeGeometry(1.5, 3, 15, 1, true);
const lampMaterial = new THREE.MeshStandardMaterial({
  color: "red",
  side: THREE.DoubleSide,
});
type LampProps = {
  position: [number, number, number];
  rotation: [number, number, number];
};

const wallMaterial = new THREE.MeshStandardMaterial({
  color: "grey",
});
const wallGeometry = new THREE.BoxGeometry(1, 1, 1);
type WallProps = {
  dimensions: [number, number, number];
  position: [number, number, number];
};
const Wall = ({ dimensions, position }: WallProps) => {
  return (
    <mesh
      position={position}
      scale={dimensions}
      material={wallMaterial}
      geometry={wallGeometry}
      receiveShadow
    ></mesh>
  );
};

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
