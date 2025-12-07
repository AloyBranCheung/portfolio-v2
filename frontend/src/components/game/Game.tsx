"use client";
import CartoonBlock from "./CartoonBlock";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

interface Block {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

// gradually change colors
const getGradientColor = (index: number) => {
  const hue = (index * 30) % 360; // cycle through hues
  return `hsl(${hue}, 80%, 60%)`;
};

export default function Game() {
  const mainBlockRef = useRef<THREE.Group>(null);
  const speedRef = useRef(0.05);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [direction, setDirection] = useState<"x" | "z">("x");
  const [currColor, setCurrColor] = useState(0);

  useFrame(() => {
    if (!mainBlockRef.current) return;

    // move block in one axis
    const speed = speedRef.current;
    if (direction === "x") {
      mainBlockRef.current.position.x += speed;
    } else {
      mainBlockRef.current.position.z += speed;
    }

    // if block has moved further than 5 units, change direction
    if (
      Math.abs(mainBlockRef.current.position.x) > 5 ||
      Math.abs(mainBlockRef.current.position.z) > 5
    ) {
      speedRef.current *= -1;
    }
  });

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!mainBlockRef.current) return;

    // get geometry from first mesh child
    const meshChild = mainBlockRef.current.children.find(
      (child) =>
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.BoxGeometry
    ) as THREE.Mesh<THREE.BoxGeometry> | undefined;

    if (!meshChild) return;

    // change the mainBlock's color
    mainBlockRef.current.children.forEach((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshToonMaterial
      ) {
        child.material.color = new THREE.Color(getGradientColor(currColor));
      }
    });

    // move main block up up
    mainBlockRef.current.position.y += meshChild.geometry.parameters.height;

    // leave behind the block
    const newBlock: Block = {
      position: [
        mainBlockRef.current.position.x,
        mainBlockRef.current.position.y -
          meshChild.geometry.parameters.height / 2,
        mainBlockRef.current.position.z,
      ],
      size: [
        meshChild.geometry.parameters.width,
        meshChild.geometry.parameters.height,
        meshChild.geometry.parameters.depth,
      ],
      color: getGradientColor(currColor),
    };

    setBlocks((prev) => [...prev, newBlock]);

    // change axis and color
    setDirection(direction === "x" ? "z" : "x");
    setCurrColor(currColor + 1);
  };

  return (
    <group onPointerDown={handleClick}>
      {blocks.map((block, i) => (
        <CartoonBlock
          key={`${block.position[0]}-${block.position[1]}-${block.position[2]}-${i}`}
          position={block.position}
          size={block.size}
          color={block.color}
        />
      ))}
      <CartoonBlock ref={mainBlockRef} color={getGradientColor(currColor)} />
    </group>
  );
}
