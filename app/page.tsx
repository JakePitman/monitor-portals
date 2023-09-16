"use client";

import { Canvas } from "@react-three/fiber";

import { Experience } from "./Experience";

export default function Home() {
  return (
    <main className="w-[100vw] h-[100vh]">
      <Canvas shadows camera={{ position: [0, 0, 10], far: 200 }}>
        <Experience />
      </Canvas>
    </main>
  );
}
