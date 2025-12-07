"use client";
import CartoonBlock from "./CartoonBlock";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { useState, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { CARTOON_BLOCK_SIZE, CARTOON_BLOCK_POSITION } from "./CartoonBlock";
import { gsap } from "gsap";

interface Block {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  type?: "fixed";
}

interface FallingBlock {
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
  type: "fixed",
};

const INITIAL_SPEED = 0.05;

interface GameProps {
  isGameOver: boolean;
  setIsGameOverTrue: () => void;
  resetRef: { current: (() => void) | null };
}

export default function Game({
  isGameOver,
  setIsGameOverTrue,
  resetRef,
}: GameProps) {
  const mainBlockRef = useRef<THREE.Group>(null);
  const speedRef = useRef(INITIAL_SPEED);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const initialCameraY = useRef<number | null>(null);
  const gameBlocksRef = useRef<Map<string, THREE.Group>>(new Map());

  const [blocks, setBlocks] = useState<Block[]>([initialBlock]);
  const [fallingBlocks, setFallingBlocks] = useState<FallingBlock[]>([]);
  const [direction, setDirection] = useState<"x" | "z">("x");
  const [currColor, setCurrColor] = useState(1);
  const [mainBlockSize, setMainBlockSize] = useState<[number, number, number]>([
    4, 0.5, 4,
  ]);
  const [mainBlockPos, setMainBlockPos] = useState<[number, number, number]>([
    0, 0.59, 0,
  ]);

  useFrame(({ camera }) => {
    if (!mainBlockRef.current || isGameOver) return;

    cameraRef.current = camera;
    // fix orthographic camera camera offset
    if (initialCameraY.current === null) {
      initialCameraY.current = camera.position.y;
    }

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

  const reset = () => {
    // game over - animate all blocks shrinking to last block
    const lastBlockPos = blocks[blocks.length - 1].position;
    const timeline = gsap.timeline({
      onComplete: () => {
        // reset the position (when animation completed everything is set to 0)
        if (mainBlockRef.current) {
          gsap.to(mainBlockRef.current.scale, {
            x: 1,
            y: 1,
            z: 1,
          });
          gsap.to(mainBlockRef.current.position, {
            x: 0,
            y: 0.58,
            z: 0,
          });
        }
        const ele = gameBlocksRef.current.get("block-0");
        if (ele) {
          gsap.to(ele.scale, {
            x: 1,
            y: 1,
            z: 1,
          });
          gsap.to(ele.position, {
            x: 0,
            y: 0,
            z: 0,
          });
        }

        // reset game state
        setBlocks([initialBlock]);
        setFallingBlocks([]);
        setDirection("x");
        setCurrColor(1);
        setMainBlockSize(CARTOON_BLOCK_SIZE);
        setMainBlockPos(CARTOON_BLOCK_POSITION);
        if (cameraRef.current && initialCameraY.current !== null) {
          cameraRef.current.position.y = initialCameraY.current;
          gsap.to(cameraRef.current.position, { y: initialCameraY.current });
        }
        speedRef.current = INITIAL_SPEED;
        gameBlocksRef.current.clear();
      },
    });

    gameBlocksRef.current.forEach((blockRef) => {
      timeline.to(
        blockRef.position,
        {
          x: lastBlockPos[0],
          y: lastBlockPos[1],
          z: lastBlockPos[2],
          duration: 0.5,
          ease: "power2.in",
        },
        0
      );

      timeline.to(
        blockRef.scale,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        0
      );
    });

    if (mainBlockRef.current) {
      timeline.to(
        mainBlockRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        0
      );
    }
  };

  const runGameLogic = useCallback(() => {
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
      setIsGameOverTrue();
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

    // calculate cutoff block
    const cutoffSize: [number, number, number] = [...lastBlock.size];
    cutoffSize[direction === "x" ? 0 : 2] = Math.abs(offset);
    const cutoffPos: [number, number, number] = [...lastBlock.position];
    cutoffPos[1] += meshChild.geometry.parameters.height;
    cutoffPos[direction === "x" ? 0 : 2] =
      lastBlock.position[direction === "x" ? 0 : 2] +
      offset / 2 +
      (offset > 0
        ? overlap / 2 + cutoffSize[direction === "x" ? 0 : 2] / 2
        : -(overlap / 2 + cutoffSize[direction === "x" ? 0 : 2] / 2));

    setFallingBlocks((prev) => [
      ...prev,
      {
        position: cutoffPos,
        size: cutoffSize,
        color: getGradientColor(currColor),
      },
    ]);

    // add previous location block to array first
    const oldBlock: Block = {
      position: newPos,
      size: newSize,
      color: getGradientColor(currColor),
      type: "fixed",
    };
    setBlocks((prev) => [...prev, oldBlock]);

    // update mainBlock size and position
    setMainBlockSize(newSize);
    const newMainBlockPos: [number, number, number] = [...newPos];
    newMainBlockPos[1] += 0.5;
    setMainBlockPos(newMainBlockPos);

    // move main block ref up
    mainBlockRef.current.position.y += meshChild.geometry.parameters.height;
    mainBlockRef.current.scale.set(1, 1, 1);

    // update camera with animation
    if (cameraRef.current && initialCameraY.current !== null) {
      const yOffset = initialCameraY.current - 0.59;
      gsap.to(cameraRef.current.position, {
        y: mainBlockRef.current.position.y + yOffset,
        duration: 0.5,
      });
    }

    // change axis and color
    setDirection(direction === "x" ? "z" : "x");
    setCurrColor(currColor + 1);

    // randomly increment speed as it gets harder
    const sign = speedRef.current > 0 ? 1 : -1;
    speedRef.current =
      sign * (Math.abs(speedRef.current) + Math.random() * 0.005);
  }, [blocks, currColor, direction, setIsGameOverTrue]);

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    runGameLogic();
  };

  useEffect(() => {
    resetRef.current = reset;
  }, [resetRef, reset]);

  useEffect(() => {
    const spacedownHandler = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        runGameLogic();
      }
    };

    window.addEventListener("keydown", spacedownHandler);

    return () => {
      window.removeEventListener("keydown", spacedownHandler);
    };
  }, [runGameLogic]);

  return (
    <group onPointerDown={handleClick}>
      {blocks.map((block, i) => (
        <CartoonBlock
          key={`${block.position[0]}-${block.position[1]}-${block.position[2]}-${i}`}
          ref={(el) => {
            if (el) gameBlocksRef.current.set(`block-${i}`, el);
          }}
          position={block.position}
          size={block.size}
          color={block.color}
          type={block?.type}
          disablePhysics={false}
        />
      ))}
      {fallingBlocks.map((block, i) => (
        <CartoonBlock
          key={`falling-${block.position[0]}-${block.position[1]}-${block.position[2]}-${i}`}
          position={block.position}
          size={block.size}
          color={block.color}
          disablePhysics={false}
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
