"use client";

import { useState } from "react";
import { OrbitControls } from "@react-three/drei";

import { PortalWorld } from "./PortalWorld";

export type Active = "ocean" | "volcano" | "forest" | null;

export const Experience = () => {
  const [active, setActive] = useState<Active>(null);

  return (
    <>
      <color args={["white"]} attach="background" />
      <OrbitControls />
      <ambientLight intensity={1} />

      <PortalWorld
        mapPath="/ocean.jpeg"
        name="ocean"
        active={active}
        setActive={setActive}
      />
    </>
  );
};
