import { useRef, useEffect } from "react";
import { RoundedBox, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Active } from "./Experience";

type Props = {
  renderPortal: (zOffset: number) => React.ReactElement;
  position: [number, number, number];
  name: NonNullable<Active>;
  active: Active;
};

export const Phone = ({ position, renderPortal, name, active }: Props) => {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    ref.current?.lookAt(camera.position);
  }, []);
  const ref = useRef<THREE.Group>(null);
  const isActive = name === active;
  const phoneDepth = 0.5;

  return (
    <Float
      floatIntensity={isActive ? 0 : 0.5}
      rotationIntensity={isActive ? 0 : 0.5}
    >
      <group position={position} ref={ref} name={name}>
        <mesh position={[-2.5, 3, 0]} scale={0.1}>
          <RoundedBox args={[1.5, 6, 1.5]} radius={0.3} castShadow>
            <meshBasicMaterial color="black" toneMapped={false} />
          </RoundedBox>
        </mesh>
        <mesh position={[-2.5, 2, 0]} scale={0.1}>
          <RoundedBox args={[1.5, 6, 1.5]} radius={0.3} castShadow>
            <meshBasicMaterial color="black" toneMapped={false} />
          </RoundedBox>
        </mesh>
        <mesh>
          <RoundedBox args={[5, 10, phoneDepth]} radius={0.5} castShadow>
            <meshBasicMaterial color="black" toneMapped={false} />
          </RoundedBox>
        </mesh>
        {renderPortal(0.2)}
      </group>
    </Float>
  );
};
