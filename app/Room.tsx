import { Text, useGLTF, useTexture } from "@react-three/drei";

export const Room = () => {
  const { nodes } = useGLTF("/room.glb");
  const texture = useTexture("/baked.jpg");
  texture.flipY = false;

  const chars = {
    click: "Click",
    timesTwo: "x 2",
    drag: "drag\nscreen",
    live: "Live",
    a: "a",
    little: "little",
  };
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
        characters={chars.click}
      >
        {chars.click}
      </Text>
      <Text
        font="/GochiHand-Regular.ttf"
        position={[-10.86, 19.09, 1.58]}
        scale={1}
        color={"black"}
        characters={chars.timesTwo}
      >
        {chars.timesTwo}
      </Text>
      <Text
        font="/GochiHand-Regular.ttf"
        position={[-5.5, 8.16, 1.75]}
        scale={0.8}
        color={"black"}
        characters={chars.drag}
      >
        {chars.drag}
      </Text>
      <Text
        font="/GochiHand-Regular.ttf"
        position={[9.71, 12.56, 1.6]}
        scale={1.2}
        color={"black"}
        characters={chars.live}
      >
        {chars.live}
      </Text>
      <Text
        font="/GochiHand-Regular.ttf"
        position={[10.98, 8.79, 1.6]}
        rotation={[0, 0, 0.2]}
        scale={1.2}
        color={"black"}
        characters={chars.a}
      >
        {chars.a}
      </Text>
      <Text
        font="/GochiHand-Regular.ttf"
        position={[12.71, 10.22, 1.6]}
        rotation={[0, 0, -0.2]}
        scale={1.1}
        color={"black"}
        characters={chars.little}
      >
        {chars.little}
      </Text>
    </group>
  );
};
