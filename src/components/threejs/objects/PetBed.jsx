import { BakedMaterial } from '@/components/threejs';

export const PetBed = ({ nodes, ...props }) => {
  return <BakedMaterial name='Pet_Bed' geometry={nodes.Pet_Bed.geometry} material={nodes.Pet_Bed.material} position={[1.54, 0.23, 3.9]} {...props} />;
};