"use client";

import { useState } from "react";
import { OrbitControls } from "@react-three/drei";

import { PortalWorld } from "./PortalWorld";

export type Active = "ocean" | "park" | "metro" | null;

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
        mapPath="/park.jpeg"
        name="park"
        active={active}
        setActive={setActive}
      />
      <PortalWorld
        position={[8, 0, 0]}
        mapPath="/metropolis.jpeg"
        name="metro"
        active={active}
        setActive={setActive}
      />
    </>
  );
};
