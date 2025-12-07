"use client";
import CartoonBlock from "./CartoonBlock";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { number } from "motion/react";
import { useState, useRef, useEffect } from "react";
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
  const cameraRef = useRef<THREE.Camera | null>(null);
  const controlsRef = useRef<{
    target: THREE.Vector3;
    update: () => void;
  } | null>(null);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [direction, setDirection] = useState<"x" | "z">("x");
  const [currColor, setCurrColor] = useState(0);
  const [mainBlockSize, setMainBlockSize] = useState<[number, number, number]>([
    4, 0.5, 4,
  ]);
  const [mainBlockPos, setMainBlockPos] = useState<[number, number, number]>([
    0, 0.59, 0,
  ]);

  useFrame(({ camera, controls }) => {
    cameraRef.current = camera;
    if (controls && "target" in controls && "update" in controls) {
      controlsRef.current = controls as {
        target: THREE.Vector3;
        update: () => void;
      };
    }

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

    // move main block up
    mainBlockRef.current.position.y += meshChild.geometry.parameters.height;

    // update camera and controls
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.y = mainBlockRef.current.position.y + 6;
      controlsRef.current.target.y = mainBlockRef.current.position.y;
      controlsRef.current.update();
    }

    // calculate the overlap
    const lastBlock = blocks[blocks.length - 1];
    let oldBlock: Block = {
      position: [
        mainBlockRef.current.position.x,
        mainBlockRef.current.position.y - meshChild.geometry.parameters.height,
        mainBlockRef.current.position.z,
      ],
      size: [
        meshChild.geometry.parameters.width,
        meshChild.geometry.parameters.height,
        meshChild.geometry.parameters.depth,
      ],
      color: getGradientColor(currColor),
    };

    if (lastBlock) {
      const offset =
        direction === "x"
          ? mainBlockRef.current.position.x - lastBlock.position[0]
          : mainBlockRef.current.position.z - lastBlock.position[2];
      const overlap =
        direction === "x"
          ? lastBlock.size[0] - Math.abs(offset)
          : lastBlock.size[2] - Math.abs(offset);

      if (overlap <= 0) {
        setBlocks([]);
        setDirection("x");
        setCurrColor(0);
        setMainBlockSize([4, 0.25, 4]);
        return;
      }

      // calculate new size
      const newSize: [number, number, number] = [...lastBlock.size];
      newSize[direction === "x" ? 0 : 2] = overlap;

      // calculate new position
      const newPos: [number, number, number] = [...lastBlock.position];
      newPos[1] += meshChild.geometry.parameters.height;
      newPos[direction === "x" ? 0 : 2] =
        lastBlock.position[direction === "x" ? 0 : 2] + offset / 2;

      oldBlock = {
        position: newPos,
        size: newSize,
        color: getGradientColor(currColor),
      };

      // update mainBlock size
      setMainBlockSize(newSize);
      const newMainBlockPos: [number, number, number] = [...newPos];
      newMainBlockPos[1] += 0.5;
      setMainBlockPos(newMainBlockPos);
    }

    setBlocks((prev) => [...prev, oldBlock]);

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
      <CartoonBlock
        position={mainBlockPos}
        ref={mainBlockRef}
        size={mainBlockSize}
        color={getGradientColor(currColor)}
      />
    </group>
  );
}
