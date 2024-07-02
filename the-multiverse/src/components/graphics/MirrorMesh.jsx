import { DoubleSide } from "three";

export const MirrorMesh = ({ z }) => {
  return (
    <>
      <mesh position={[10, 2.5, z]} rotation={[0, 0, 0]} scale={[20, 5, 1]}>
        <planeGeometry args={[1, 1]} />

        <meshBasicMaterial
          color="white"
          side={DoubleSide}
          transparent={true}
          opacity={0.035}
        />
      </mesh>
      <mesh position={[10, 2.5, z]} rotation={[0, 0, 0]} scale={[20, 5, 1]}>
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
