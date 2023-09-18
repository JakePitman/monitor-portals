import { Text, useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";

export const Room = () => {
  const { nodes } = useGLTF("/room.glb");
  const texture = useTexture("/baked.jpg");
  texture.flipY = false;

  const { position } = useControls({
    position: [-12.1, 19.5, 3],
  });

  const clickChars = "Click";
  const timesTwoChars = "x 2";
  const dragChars = "drag \nscreen";
  return (
    <group position={[0, -5, -14]}>
      <mesh
        scale={1.2}
        rotation={[0, Math.PI, 0]}
        geometry={nodes.merged.geometry}
        receiveShadow
      >
        <meshStandardMaterial map={texture} />
      </mesh>
      <Text
        font="/GochiHand-Regular.ttf"
        rotation={[0, 0, 0.1]}
        position={[-12.85, 20.49, 1.64]}
        scale={1}
        color={"black"}
        characters={clickChars}
      >
        {clickChars}
      </Text>
      <Text
        font="/GochiHand-Regular.ttf"
        position={[-10.86, 19.09, 1.58]}
        scale={1}
        color={"black"}
        characters={timesTwoChars}
      >
        {timesTwoChars}
      </Text>
      <Text
        font="/GochiHand-Regular.ttf"
        position={[-5.5, 8.16, 1.75]}
        scale={0.8}
        color={"black"}
        characters={dragChars}
      >
        {dragChars}
      </Text>
    </group>
  );
};
