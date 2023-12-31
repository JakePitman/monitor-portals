import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { easing } from "maath";

const messageMaterial = new MeshStandardMaterial({
  color: "white",
  toneMapped: false,
});

const messageDepth = 0.3;
type Props = {
  text: string;
  iteration: number;
  isHovered: boolean;
};

export const Message = ({ text, iteration, isHovered }: Props) => {
  const groupRef = useRef(null);
  const triangleRef = useRef(null);
  const height = 1.3;
  const isOddIteration = useMemo(() => iteration % 2 === 0, [iteration]);

  const xOffset = { idle: 1.8, hovered: isOddIteration ? 4 : -0 };
  const yOffset = iteration * (height - 0.4);
  const zOffset = { idle: 0.5, hovered: 3 };
  const yRotation = { idle: 0, hovered: isOddIteration ? -0.7 : 0.7 };

  const triangleXPosition = {
    idle: isOddIteration ? -1.5 : 1.5,
    hovered: isOddIteration ? -2.3 : 2.3,
  };
  const triangleYPosition = {
    idle: -0.17,
    hovered: 0,
  };

  useFrame((_state, delta) => {
    if (isHovered) {
      groupRef.current &&
        easing.damp(
          groupRef.current.position,
          "x",
          xOffset.hovered,
          0.2,
          delta
        );
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
      triangleRef.current &&
        easing.damp(
          triangleRef.current.position,
          "x",
          triangleXPosition.hovered,
          0.2,
          delta
        );
      triangleRef.current &&
        easing.damp(
          triangleRef.current.position,
          "y",
          triangleYPosition.hovered,
          0.2,
          delta
        );
    } else {
      groupRef.current &&
        easing.damp(groupRef.current.position, "x", xOffset.idle, 0.2, delta);
      groupRef.current &&
        easing.damp(groupRef.current.position, "z", zOffset.idle, 0.2, delta);
      groupRef.current &&
        easing.damp(groupRef.current.rotation, "y", yRotation.idle, 0.2, delta);
      triangleRef.current &&
        easing.damp(
          triangleRef.current.position,
          "x",
          triangleXPosition.idle,
          0.2,
          delta
        );
      triangleRef.current &&
        easing.damp(
          triangleRef.current.position,
          "y",
          triangleYPosition.idle,
          0.1,
          delta
        );
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
        position={[triangleXPosition.idle, triangleYPosition.idle, 0]}
        rotation={[0, 0, Math.PI * 0.23]}
        ref={triangleRef}
      >
        <boxGeometry args={[1.1, 1.1, messageDepth]} />
      </mesh>
    </group>
  );
};
