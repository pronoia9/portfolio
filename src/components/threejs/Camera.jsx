import { PerspectiveCamera } from "@react-three/drei";

export const Camera = () => {
  return (
    <group name='Camera' position={[20.02, 15.24, 20.01]} rotation={[1.24, 0.3, -0.74]}>
      <PerspectiveCamera name='TrueIsoCam_1' makeDefault={false} far={1000} near={0.1} fov={22.9} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
};

{/* <group name='Camera_Container' position={[20.02, 15.24, 20.01]} rotation={[1.24, 0.3, -0.74]}>
  <Camera name='TrueIsoCam_1' makeDefault={true} far={1000} near={0.1} fov={22.9} rotation={[-Math.PI / 2, 0, 0]} />
</group>; */}
