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
      <mesh>
        <RoundedBox args={[5, 10, phoneDepth]} radius={0.5}>
          <meshStandardMaterial color="white" toneMapped={false} />
        </RoundedBox>
      </mesh>
      {renderPortal(0.2)}
    </group>
  );
};
