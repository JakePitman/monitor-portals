import { Text, RoundedBox } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

const messageMaterial = new MeshStandardMaterial({ color: "white" });

const messageDepth = 0.3;
export const Message = () => {
  return (
    <group position={[0, 0, 1]}>
      <RoundedBox
        material={messageMaterial}
        args={[5, 1, messageDepth]}
        radius={0.15}
      >
        <Text position={[0, 0, 0.2]} scale={0.5} color={"black"}>
          Hello
        </Text>
      </RoundedBox>

      <mesh
        material={messageMaterial}
        position={[0, -0.2, 0]}
        rotation={[0, 0, Math.PI * 0.23]}
      >
        <boxGeometry args={[0.8, 0.8, messageDepth]} />
      </mesh>
    </group>
  );
};
