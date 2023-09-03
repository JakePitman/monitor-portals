import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const Desk = () => (
  <mesh position={[0, -7, 0]}>
    <RoundedBox args={[25, 2, 13]} radius={0.5}>
      <meshStandardMaterial color="cream" toneMapped={false} />
    </RoundedBox>
  </mesh>
);

const Lamp = () => {
  return <></>;
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
      <Desk />
    </group>
  );
};
