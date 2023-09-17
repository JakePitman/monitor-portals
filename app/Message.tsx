import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { easing } from "maath";

const messageMaterial = new MeshStandardMaterial({ color: "white" });

const messageDepth = 0.3;
type Props = {
  text: string;
  iteration: number;
  isHovered: boolean;
};

export const Message = ({ text, iteration, isHovered }: Props) => {
  const height = 1;
  const isOddIteration = useMemo(() => iteration % 2 === 0, [iteration]);

  const xOffset = { idle: 1.8, hovered: isOddIteration ? 4 : -0 };
  const yOffset = iteration * (height - 0.2);
  const zOffset = { idle: 0.5, hovered: 3 };
  const yRotation = { idle: 0, hovered: isOddIteration ? -0.7 : 0.7 };

  const triangleXPosition = isOddIteration ? -1.5 : 1.5;
  const groupRef = useRef(null);

  useFrame((_state, delta) => {
    if (isHovered) {
      groupRef.current &&
        easing.damp(
          groupRef.current.position,
          "z",
          zOffset.hovered,
          0.2,
          delta
        );
      groupRef.current &&
        easing.damp(
          groupRef.current.rotation,
          "y",
          yRotation.hovered,
          0.2,
          delta
        );
      groupRef.current &&
        easing.damp(
          groupRef.current.position,
          "x",
          xOffset.hovered,
          0.2,
          delta
        );
    } else {
      groupRef.current &&
        easing.damp(groupRef.current.position, "z", zOffset.idle, 0.2, delta);
      groupRef.current &&
        easing.damp(groupRef.current.rotation, "y", yRotation.idle, 0.2, delta);
      groupRef.current &&
        easing.damp(groupRef.current.position, "x", xOffset.idle, 0.2, delta);
    }
  });

  return (
    <group
      position={[xOffset.idle, 8 - yOffset, zOffset.idle]}
      scale={0.5}
      ref={groupRef}
    >
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
  );
};
