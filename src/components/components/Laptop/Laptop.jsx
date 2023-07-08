import { useRef } from 'react';
import { MathUtils } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

import { dataStore } from '../../../store/dataStore';
import { laptopMotion } from '../../../utils';

export const Laptop = ({ hinge, elevate, ...props }) => {
  const { nodes, materials } = useGLTF('src/assets/3d/macbook.glb');
  const { laptopOpen, setLaptopHover } = dataStore((state) => ({
    laptopOpen: state.laptopOpen,
    setLaptopHover: state.setLaptopHover,
  }));

  // The view was auto-generated by: https://github.com/pmndrs/gltfjsx
  // Events and spring animations were added afterwards
  return (
    <motion.group
      dispose={null}
      {...props}
      onPointerOver={(e) => (e.stopPropagation(), setLaptopHover(true))}
      onPointerOut={(e) => setLaptopHover(false)}
    >
      <group position={[0, -0.014, 0]} scale={0.275}>
        <mesh castShadow receiveShadow geometry={nodes.Base_1.geometry} material={materials.Space_Grey} />
        <mesh castShadow receiveShadow geometry={nodes.Base_2.geometry} material={materials.Caps_Lock_Light} />
        <mesh castShadow receiveShadow geometry={nodes.Base_3.geometry} material={materials['Material.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Base_4.geometry} material={materials.Black_Plastic} />
        <mesh castShadow receiveShadow geometry={nodes.Base_5.geometry} material={materials['Keys.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Base_6.geometry} material={materials.Black_Glass} />
        <mesh castShadow receiveShadow geometry={nodes.Base_7.geometry} material={materials['Keys.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Base_8.geometry} material={materials['Touch_Bar_Shot_2021-04-02_at_18.13.28']} />
      </group>
      <motion.group
        position={[0, 0.008, -0.104]}
        scale={0.275}
        // animate={!laptopOpen ? { rotateX: 0 } : { rotateX: -Math.PI / 2 }}
        variants={{
          close: { rotateX: 0 },
          open: { rotateX: -Math.PI / 2 },
        }}
      >
        <mesh castShadow receiveShadow geometry={nodes.Display_1.geometry} material={materials.Space_Grey} />
        <mesh castShadow receiveShadow geometry={nodes.Display_2.geometry} material={materials['Space_Grey.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Display_3.geometry} material={materials.Black_Glass} />
        <mesh castShadow receiveShadow geometry={nodes.Display_4.geometry} material={materials['Screen OFF']} />
        <mesh castShadow receiveShadow geometry={nodes.Display_5.geometry} material={materials.Black_Plastic} />
        <mesh castShadow receiveShadow geometry={nodes.Display_6.geometry} material={materials.Camera_Light} />
        <mesh castShadow receiveShadow geometry={nodes.Display_7.geometry} material={materials.Glass} />
      </motion.group>
    </motion.group>
  );
};
useGLTF.preload('src/assets/3d/macbook.glb');
