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

const initialBlock: Block = {
  position: [0, 0, 0],
  size: [4, 0.5, 4],
  color: getGradientColor(0),
};

const INITIAL_SPEED = 0.05;

export default function Game() {
  const mainBlockRef = useRef<THREE.Group>(null);
  const speedRef = useRef(INITIAL_SPEED);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const initialCameraY = useRef<number | null>(null);

  const [blocks, setBlocks] = useState<Block[]>([initialBlock]);
  const [direction, setDirection] = useState<"x" | "z">("x");
  const [currColor, setCurrColor] = useState(1);
  const [mainBlockSize, setMainBlockSize] = useState<[number, number, number]>([
    4, 0.5, 4,
  ]);
  const [mainBlockPos, setMainBlockPos] = useState<[number, number, number]>([
    0, 0.59, 0,
  ]);

  useFrame(({ camera }) => {
    cameraRef.current = camera;
    // fix orthographic camera camera offset
    if (initialCameraY.current === null) {
      initialCameraY.current = camera.position.y;
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

  const runGameLogic = () => {
    if (!mainBlockRef.current) return;

    // get geometry from first mesh child
    const meshChild = mainBlockRef.current.children.find(
      (child) =>
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.BoxGeometry
    ) as THREE.Mesh<THREE.BoxGeometry> | undefined;

    if (!meshChild) return;

    // calculate the overlap
    const lastBlock = blocks[blocks.length - 1];
    const offset =
      direction === "x"
        ? mainBlockRef.current.position.x - lastBlock.position[0]
        : mainBlockRef.current.position.z - lastBlock.position[2];
    const overlap =
      direction === "x"
        ? lastBlock.size[0] - Math.abs(offset)
        : lastBlock.size[2] - Math.abs(offset);

    // game state check
    if (overlap <= 0) {
      // game over
      setBlocks([initialBlock]);
      setDirection("x");
      setCurrColor(1);
      setMainBlockSize([4, 0.5, 4]);
      setMainBlockPos([0, 0.59, 0]);
      if (cameraRef.current && initialCameraY.current !== null) {
        cameraRef.current.position.y = initialCameraY.current;
      }
      speedRef.current = INITIAL_SPEED;
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

    // add previous location block to array first
    const oldBlock: Block = {
      position: newPos,
      size: newSize,
      color: getGradientColor(currColor),
    };
    setBlocks((prev) => [...prev, oldBlock]);

    // update mainBlock size and position
    setMainBlockSize(newSize);
    const newMainBlockPos: [number, number, number] = [...newPos];
    newMainBlockPos[1] += 0.5;
    setMainBlockPos(newMainBlockPos);

    // move main block ref up
    mainBlockRef.current.position.y += meshChild.geometry.parameters.height;

    // update camera
    if (cameraRef.current && initialCameraY.current !== null) {
      const yOffset = initialCameraY.current - 0.59;
      cameraRef.current.position.y = mainBlockRef.current.position.y + yOffset;
    }

    // change axis and color
    setDirection(direction === "x" ? "z" : "x");
    setCurrColor(currColor + 1);

    // randomly increment speed as it gets harder
    const sign = speedRef.current > 0 ? 1 : -1;
    speedRef.current =
      sign * (Math.abs(speedRef.current) + Math.random() * 0.005);
  };

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    runGameLogic();
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
