"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CartoonBlock from "./CartoonBlock";
interface Block {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

export default function TowerBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([
    { position: [0, 0.125, 0], size: [4, 0.25, 4], color: "greenyellow" },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const currentBlockRef = useRef<THREE.Group>(null);
  const [direction, setDirection] = useState<"x" | "z">("x");
  const speed = useRef(0.05);
  const moving = useRef(true);

  useFrame(() => {
    if (!moving.current || !currentBlockRef.current || gameOver) return;

    const axis = direction === "x" ? 0 : 2;
    currentBlockRef.current.position.setComponent(
      axis,
      currentBlockRef.current.position.getComponent(axis) + speed.current
    );

    if (Math.abs(currentBlockRef.current.position.getComponent(axis)) > 5) {
      speed.current *= -1;
    }
  });

  const handleClick = () => {
    if (gameOver || !currentBlockRef.current) return;

    const lastBlock = blocks[blocks.length - 1];
    const currentPos = currentBlockRef.current.position;
    const axis = direction === "x" ? 0 : 2;
    const offset = currentPos.getComponent(axis) - lastBlock.position[axis];
    const overlap = lastBlock.size[axis] - Math.abs(offset);

    if (overlap <= 0) {
      setGameOver(true);
      moving.current = false;
      return;
    }

    const newSize: [number, number, number] = [...lastBlock.size];
    newSize[axis] = overlap;

    const newPos: [number, number, number] = [...lastBlock.position];
    newPos[1] += 0.25;
    newPos[axis] = lastBlock.position[axis] + offset / 2;

    const colors = ["purple", "hotpink", "orange", "cyan", "lime", "yellow"];
    const newBlock: Block = {
      position: newPos,
      size: newSize,
      color: colors[blocks.length % colors.length],
    };

    setBlocks([...blocks, newBlock]);
    setDirection(direction === "x" ? "z" : "x");
    moving.current = true;
    speed.current = 0.05 * (Math.random() > 0.5 ? 1 : -1);
  };

  const lastBlock = blocks[blocks.length - 1];

  return (
    <group onClick={handleClick}>
      {blocks.map((block, i) => (
        <CartoonBlock
          key={i}
          position={block.position}
          size={block.size}
          color={block.color}
        />
      ))}

      {!gameOver && (
        <CartoonBlock
          ref={currentBlockRef}
          position={[
            direction === "x" ? 0 : lastBlock.position[0],
            lastBlock.position[1] + 0.25,
            direction === "z" ? 0 : lastBlock.position[2],
          ]}
          size={lastBlock.size}
          color="hotpink"
        />
      )}
    </group>
  );
}
