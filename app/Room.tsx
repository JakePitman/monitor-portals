import { RoundedBox } from "@react-three/drei";
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
  return (
    <group>
      <Wall dimensions={[35, 40, 1]} position={[0, -5, -10]} />
      <Wall dimensions={[1, 40, 35]} position={[-17.5, -5, 0]} />
      <Wall dimensions={[1, 40, 35]} position={[17.5, -5, 0]} />
      <Desk />
    </group>
  );
};
