'use client';

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx ./brunos-room.glb --keepnames --transform --draco
*/

import { useEffect, useRef, useState } from 'react';
import { MathUtils, LoopOnce } from 'three';
import { useFrame } from '@react-three/fiber';
import { Center, useAnimations, useGLTF, useScroll } from '@react-three/drei';
import { folder, useControls } from 'leva';

import { Camera, Cube, Room } from '@/components/threejs';
import { objectsUpdateResponsive } from '@/utils';

export const Scene = ({ cubeRef, ...props }) => {
  const group = useRef(); // Reference to the top group in the 3D scene
  const [cube, setCube] = useState('initial'), // State to keep track of the cube's state (initial, animating, show room, hidden)
    [responsives, setResponsives] = useState({ cube: 0.25, room: 1, camera: 0.3 }); // State to responsively resize/reposition objects
  const { nodes, materials, animations } = useGLTF('/3d/brunos-room-transformed.glb');
  const { actions } = useAnimations(animations, group); // Extract animation actions from loaded animations
  const scroll = useScroll(); // Get scroll data for controlling animation

  // Define constants for camera rotation
  const camRotationX = -1.5707963267, // Rotation around the X-axis
    camRotationY = 0; // Rotation around the Y-axis
  // Define UI controls for camera properties using 'leva'
  const cameraOptions = useControls('Camera', {
    Position: folder({
      'Enable [Position]': true,
      'Multiplier [Position]': { value: 0.25, step: 0.01, min: 0, max: 2 },
      'Speed [Position]': { value: 0.1, step: 0.01, min: 0, max: 2 },
    }),
    Rotation: folder({
      'Enable [Rotation]': true,
      'Threshold [Rotation]': { value: 0, step: 0.01, min: 0, max: 2 },
      'Up/Down': folder({
        'Enable [Up/Down]': true,
        'Multiplier [Up/Down]': { value: 0.25, step: 0.01, min: 0, max: 2 },
        'Speed [Up/Down]': { value: 0.5, step: 0.01, min: 0, max: 5 },
      }),
      'Left/Right': folder({
        'Enable [Left/Right]': true,
        'Multiplier [Left/Right]': { value: 0.5, step: 0.01, min: 0, max: 2 },
        'Speed [Left/Right]': { value: 2, step: 0.01, min: 0, max: 5 },
      }),
    }),
  });

  // Disable the 'Camera Scroll' animation initially
  useEffect(() => void (actions['Camera Scroll'].play().paused = true), []);

  // Reset scroll offset to the start once the room is shown and the cube is hidden
  useEffect(() => void (cube === 'hidden' && (scroll.offset = 0)), [cube]);

  // Resizing
  useEffect(() => {
    const resize = () => void setResponsives((prev) => ({ ...prev, ...objectsUpdateResponsive(scroll.offset) }));
    window.addEventListener('resize', resize);
    return () => void window.removeEventListener('resize', resize);
  }, []);

  // Updating refs from Experience.jsx
  useEffect(() => { cubeRef.current = cube; }, [cube]);

  useFrame(({ camera, pointer }, delta) => {
    // console.log('cube:', cube, '  |   offset:', scroll.offset);
    const cameraAction = actions['Camera Scroll'],
      cubeAction = actions['Cube Animation'];

    // Play cube animation on first scroll
    if (cube === 'initial' && scroll.offset > 0) {
      cubeAction.clampWhenFinished = true;
      cubeAction.setLoop(LoopOnce).play();
      setCube('animating');
    }
    // Show room during cube animation before the cube is hidden
    else if (cube === 'animating' && cubeAction.time >= cubeAction.getClip().duration * 0.35) setCube('show room');
    // Hide cube once its animation is done
    else if (cube === 'show room' && cubeAction.time === cubeAction.getClip().duration) setCube('hidden');
    // Enable camera scroll + controls
    else if (cube === 'hidden') {
      // Interpolate camera action time based on scroll offset
      // cameraAction.time = MathUtils.damp(cameraAction.time, (cameraAction.getClip().duration) * scroll.offset, 100, delta);
      cameraAction.time = MathUtils.lerp(cameraAction.time, cameraAction.getClip().duration * scroll.offset, 0.05);

      // Camera Position
      camera.position.lerp(
        cameraOptions['Enable [Position]']
          ? { x: pointer.x * cameraOptions['Multiplier [Position]'], y: 0, z: -pointer.y * cameraOptions['Multiplier [Position]'] }
          : { x: 0, y: 0, z: 0 },
        cameraOptions['Speed [Position]']
      );

      // Camera Rotation
      camera.rotation.x = MathUtils.lerp(
        camera.rotation.x,
        Math.abs(pointer.y) > cameraOptions['Threshold [Rotation]'] && cameraOptions['Enable [Up/Down]'] && cameraOptions['Enable [Rotation]']
          ? camRotationX + pointer.y * cameraOptions['Multiplier [Up/Down]'] * scroll.offset
          : camRotationX,
        delta * scroll.offset * cameraOptions['Speed [Up/Down]']
      );
      camera.rotation.y = MathUtils.lerp(
        camera.rotation.y,
        Math.abs(pointer.x) > cameraOptions['Threshold [Rotation]'] && cameraOptions['Enable [Left/Right]'] && cameraOptions['Enable [Rotation]']
          ? -pointer.x * cameraOptions['Multiplier [Left/Right]'] * scroll.offset
          : camRotationY,
        delta * scroll.offset * cameraOptions['Speed [Left/Right]']
      );
    }
  });

  return (
    <Center>
      <group ref={group} name='Scene_Container' {...props} dispose={null}>
        <Camera position={[0, 0, responsives.camera]} />
        <group name='Room_Container' position={[-0.25, -0.3, -0.01]}>
          {cube !== 'hidden' && <Cube nodes={nodes} materials={materials} scale={responsives.cube} />}
          {(cube === 'show room' || cube === 'hidden') && <Room nodes={nodes} materials={materials} scale={responsives.room} />}
        </group>
      </group>
    </Center>
  );
};

useGLTF.preload('/3d/brunos-room-transformed.glb');
