import { Text, RoundedBox, Float } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

const messageMaterial = new MeshStandardMaterial({ color: "white" });

const messageDepth = 0.3;
type Props = {
  text: string;
  iteration: number;
};

export const Message = ({ text, iteration }: Props) => {
  const height = 1;
  const yOffset = iteration * (height - 0.2);
  const triangleXPosition = iteration % 2 === 0 ? -1.5 : 1.5;
  return (
    <Float floatIntensity={0} rotationIntensity={0}>
      <group position={[1.8, 8 - yOffset, 0.5]} scale={0.5}>
        <RoundedBox
          material={messageMaterial}
          args={[5, height, messageDepth]}
          radius={0.2}
        >
          <Text position={[0, 0, 0.2]} scale={0.5} color={"black"}>
            {text}
          </Text>
        </RoundedBox>

        <mesh
          material={messageMaterial}
          position={[triangleXPosition, -0.2, 0]}
          rotation={[0, 0, Math.PI * 0.23]}
        >
          <boxGeometry args={[0.8, 0.8, messageDepth]} />
        </mesh>
      </group>
    </Float>
  );
};
