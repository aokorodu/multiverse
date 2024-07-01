export const ConeObject = ({ roomHeight, position }) => {
  return (
    <>
      <mesh
        position={[position.x / 10, 1, (roomHeight - position.y) / 10]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <coneGeometry></coneGeometry>
        <meshStandardMaterial color={"red"} />
      </mesh>
    </>
  );
};
