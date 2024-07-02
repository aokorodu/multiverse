import { Outlines } from "@react-three/drei";

export const ConeObject = ({
  roomHeight,
  position,
  rotation = [Math.PI / 2, 0, 0],
  selected = false,
}) => {
  return (
    <>
      <mesh
        position={[position.x / 10, 1, (roomHeight - position.y) / 10]}
        rotation={rotation}
      >
        <coneGeometry></coneGeometry>
        <meshStandardMaterial color={"red"} />
        {selected && <Outlines thickness={0.2} color={"greenyellow"} />}
      </mesh>
    </>
  );
};
