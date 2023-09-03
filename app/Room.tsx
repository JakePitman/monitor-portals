import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const Desk = () => (
  <mesh position={[0, -7, 0]}>
    <RoundedBox args={[25, 2, 13]} radius={0.5}>
      <meshStandardMaterial color="cream" toneMapped={false} />
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
const Lamp = ({ position, rotation }: LampProps) => {
  return (
    <group position={position} rotation={rotation}>
      {/*
      TODO: Add this in and make shadows work
      <pointLight intensity={5} position={[0, -1, 0]} castShadow />
      */}
      <mesh geometry={coneGeometry} material={lampMaterial}></mesh>
    </group>
  );
};

const wallMaterial = new THREE.MeshStandardMaterial({
  color: "grey",
  toneMapped: false,
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
    ></mesh>
  );
};

export const Room = () => {
  return (
    <group>
      <Wall dimensions={[35, 40, 1]} position={[0, -5, -10]} />
      <Wall dimensions={[1, 40, 35]} position={[-17.5, -5, 0]} />
      <Wall dimensions={[1, 40, 35]} position={[17.5, -5, 0]} />
      <Lamp position={[16, 8, 8]} rotation={[0.8, 0, -0.4]} />
      <Desk />
    </group>
  );
};
