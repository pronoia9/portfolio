import { useRef } from 'react';
import { MathUtils } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { a as three } from '@react-spring/three';

import { dataStore } from '../../../store/dataStore';

export const Laptop = ({ hinge, elevate, ...props }) => {
  const { nodes, materials } = useGLTF('src/assets/3d/macbook.glb');
  const { laptopOpen, setLaptopHover, cameraPositions } = dataStore((state) => ({
    laptopOpen: state.laptopOpen,
    setLaptopHover: state.setLaptopHover,
    cameraPositions: state.cameraPositions,
  }));
  const { start, end } = cameraPositions;
  const groupRef = useRef();

  useFrame((state) => {
    // const delay = !laptopOpen ? 0.25 : 1;
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, laptopOpen ? end[0] : start[0], 0.075);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, laptopOpen ? end[1] : start[1], 0.05);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, laptopOpen ? end[2] : start[2], 0.025);
  });

  // The view was auto-generated by: https://github.com/pmndrs/gltfjsx
  // Events and spring animations were added afterwards
  return (
    <three.group
      ref={groupRef}
      dispose={null}
      {...props}
      onPointerOver={(e) => (e.stopPropagation(), setLaptopHover(true))}
      onPointerOut={(e) => setLaptopHover(false)}
      position-y={elevate}
    >
      <group position={[0, -0.014, 0]} scale={0.275}>
        <mesh castShadow receiveShadow geometry={nodes.Object_9.geometry} material={materials.Space_Grey} />
        <mesh castShadow receiveShadow geometry={nodes.Object_9_1.geometry} material={materials.Caps_Lock_Light} />
        <mesh castShadow receiveShadow geometry={nodes.Object_9_2.geometry} material={materials['Material.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_9_3.geometry} material={materials.Black_Plastic} />
        <mesh castShadow receiveShadow geometry={nodes.Object_9_4.geometry} material={materials['Keys.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_9_5.geometry} material={materials.Black_Glass} />
        <mesh castShadow receiveShadow geometry={nodes.Object_9_6.geometry} material={materials['Keys.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_9_7.geometry} material={materials['Touch_Bar_Shot_2021-04-02_at_18.13.28']} />
      </group>
      <three.group position={[0, 0.008, -0.104]} rotation={[-1.572, 0, 0]} scale={0.275} rotation-x={hinge}>
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials.Space_Grey} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4_1.geometry} material={materials['Space_Grey.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4_2.geometry} material={materials.Black_Glass} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4_3.geometry} material={materials['Screen OFF']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4_4.geometry} material={materials.Black_Plastic} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4_5.geometry} material={materials.Camera_Light} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4_6.geometry} material={materials.Glass} />
      </three.group>
    </three.group>
  );
};
useGLTF.preload('src/assets/3d/macbook.glb');
