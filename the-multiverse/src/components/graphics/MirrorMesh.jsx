import { DoubleSide } from "three";

export const MirrorMesh = ({ z, width, height }) => {
  const w = width / 10;
  const h = height / 10;
  const mirrorHeight = 10;
  return (
    <>
      <mesh
        position={[w / 2, mirrorHeight / 2, z]}
        rotation={[0, 0, 0]}
        scale={[w, mirrorHeight, 1]}
      >
        <planeGeometry args={[1, 1]} />

        <meshBasicMaterial
          color="white"
          side={DoubleSide}
          transparent={true}
          opacity={0.035}
        />
      </mesh>
      <mesh
        position={[w / 2, mirrorHeight / 2, z]}
        rotation={[0, 0, 0]}
        scale={[w, mirrorHeight, 1]}
      >
        <planeGeometry args={[1, 1]} />

        <meshBasicMaterial
          color="white"
          side={DoubleSide}
          transparent={true}
          opacity={0.1}
          wireframe={true}
        />
      </mesh>
    </>
  );
};
