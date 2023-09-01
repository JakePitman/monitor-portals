import {
  MeshPortalMaterial,
  useTexture,
  Text3D,
  Center,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

import { Active } from "./Experience";

type Props = {
  mapPath: string;
  name: NonNullable<Active>;
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<Active>>;
};

export const PortalWorld = ({ mapPath, name, active, setActive }: Props) => {
  const map = useTexture(mapPath);
  const isActive = name === active;
  return (
    <>
      <mesh onDoubleClick={() => setActive(isActive ? null : name)}>
        <planeGeometry args={[5, 4]} />
        <MeshPortalMaterial blend={isActive ? 1 : 0}>
          <ambientLight intensity={1} />

          <Center bottom>
            <Float>
              <Text3D font="/Anton_Regular.json">
                {name}
                <meshNormalMaterial />
              </Text3D>
            </Float>
          </Center>
          <mesh>
            <sphereGeometry args={[10, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
    </>
  );
};
