"use client";

import { useState } from "react";
import { OrbitControls } from "@react-three/drei";

import { PortalWorld } from "./PortalWorld";

export type Active = "ocean" | "fire" | "forest" | null;

export const Experience = () => {
  const [active, setActive] = useState<Active>(null);

  return (
    <>
      <color args={["white"]} attach="background" />
      <OrbitControls />
      <ambientLight intensity={1} />

      <PortalWorld
        position={[-8, 0, 0]}
        mapPath="/ocean.jpeg"
        name="ocean"
        active={active}
        setActive={setActive}
      />
      <PortalWorld
        position={[0, 3, 0]}
        mapPath="/forest.jpeg"
        name="forest"
        active={active}
        setActive={setActive}
      />
      <PortalWorld
        position={[8, 0, 0]}
        mapPath="/fire.jpeg"
        name="fire"
        active={active}
        setActive={setActive}
      />
    </>
  );
};
