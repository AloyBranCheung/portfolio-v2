"use client";

import * as THREE from "three";
import CartoonBlock from "./CartoonBlock";

export default function Floor() {
  return (
    <CartoonBlock
      size={[10, 0.25, 10]}
      color="greenyellow"
      position={[0, 0, 0]}
    />
  );
}
