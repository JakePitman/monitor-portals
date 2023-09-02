import { useRef, useEffect } from "react";
import { RoundedBox } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

type Props = {
  renderPortal: (zOffset: number) => React.ReactElement;
  position: [number, number, number];
};

export const Phone = ({ position, renderPortal }: Props) => {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    ref.current?.lookAt(camera.position);
  }, []);
  const ref = useRef<THREE.Group>(null);

  const phoneDepth = 0.5;
  return (
    <group position={position} ref={ref}>
      <mesh position={[-2.5, 3, 0]} scale={0.1}>
        <RoundedBox args={[1.5, 6, 1.5]} radius={0.3}>
          <meshBasicMaterial color="black" toneMapped={false} />
        </RoundedBox>
      </mesh>
      <mesh position={[-2.5, 2, 0]} scale={0.1}>
        <RoundedBox args={[1.5, 6, 1.5]} radius={0.3}>
          <meshBasicMaterial color="black" toneMapped={false} />
        </RoundedBox>
      </mesh>
      <mesh>
        <RoundedBox args={[5, 10, phoneDepth]} radius={0.5}>
          <meshBasicMaterial color="black" toneMapped={false} />
        </RoundedBox>
      </mesh>
      {renderPortal(0.2)}
    </group>
  );
};
