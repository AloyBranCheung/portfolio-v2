"use client";

export default function Block() {
  return (
    <mesh castShadow position={[0, 0.5, 0]}>
      {/* note if you want to change the size of the geometry 
                change the scale of the mesh, not the args as it results 
                in destroying and recreating which is not good for performance */}
      <boxGeometry args={[4, 0.5, 4]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
}
