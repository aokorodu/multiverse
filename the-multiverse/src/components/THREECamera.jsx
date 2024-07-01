import { PerspectiveCamera } from "@react-three/drei";

export const THREECamera = ({ position, roomHeight }) => {
  return (
    <PerspectiveCamera
      makeDefault
      fov={55}
      position={[position.x / 10, 2.5, (roomHeight - position.y) / 10]}
      onUpdate={(c) => c.updateProjectionMatrix()}
    ></PerspectiveCamera>
  );
};
