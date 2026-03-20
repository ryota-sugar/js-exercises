import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  FALL_SPEED,
  PARTICLE_SCALE_MAX,
  PARTICLE_SCALE_MIN,
  SPIN_SPEED_MAX,
  SPIN_SPEED_MIN,
  WIND_ANIMATION_SPEED,
  WIND_FLUTTER_FACTOR,
  WIND_INFLUENCE_SCALE,
} from '../../constants/PollenInfo';

type Props = {
  sugiCount: number;
  hinokiCount: number;
  windSpeed: number;
  windDirection: number;
};

export default function PollenParticles({
  sugiCount = 0,
  hinokiCount = 0,
  windSpeed = 0,
  windDirection = 0,
}: Props) {
  const sugiRef = useRef<THREE.InstancedMesh>(null);
  const hinokiRef = useRef<THREE.InstancedMesh>(null);

  // brenderで作成したスギとヒノキのモデルを読み込む
  const { nodes: sugiNodes } = useGLTF('/sugi.glb');
  const { nodes: hinokiNodes } = useGLTF('/hinoki.glb');

  const sugiGeometry = useMemo(
    () =>
      Object.values(sugiNodes).find(
        (n): n is THREE.Mesh => n instanceof THREE.Mesh,
      )?.geometry as THREE.BufferGeometry,
    [sugiNodes],
  );
  const hinokiGeometry = useMemo(
    () =>
      Object.values(hinokiNodes).find(
        (n): n is THREE.Mesh => n instanceof THREE.Mesh,
      )?.geometry as THREE.BufferGeometry,
    [hinokiNodes],
  );

  const AREA_SIZE = 40;
  const HALF_AREA = AREA_SIZE / 2;

  const createParticlesData = (num: number) => {
    return new Array(num).fill(0).map(() => ({
      x: (Math.random() - 0.5) * AREA_SIZE,
      y: (Math.random() - 0.5) * AREA_SIZE,
      z: (Math.random() - 0.5) * AREA_SIZE,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      scale:
        Math.random() * (PARTICLE_SCALE_MAX - PARTICLE_SCALE_MIN) +
        PARTICLE_SCALE_MIN,
      spinSpeed:
        Math.random() * (SPIN_SPEED_MAX - SPIN_SPEED_MIN) + SPIN_SPEED_MIN,
    }));
  };

  const sugiData = useMemo(() => createParticlesData(sugiCount), [sugiCount]);
  const hinokiData = useMemo(
    () => createParticlesData(hinokiCount),
    [hinokiCount],
  );

  const windRad = windDirection * (Math.PI / 180);
  const windVectorX = -Math.sin(windRad) * windSpeed * WIND_INFLUENCE_SCALE;
  const windVectorZ = Math.cos(windRad) * windSpeed * WIND_INFLUENCE_SCALE;

  const tempObject = useMemo(() => new THREE.Object3D(), []);

  // アニメーション処理
  const updateParticles = (
    ref: React.RefObject<THREE.InstancedMesh | null>,
    data: Array<{
      x: number;
      y: number;
      z: number;
      rx: number;
      ry: number;
      rz: number;
      scale: number;
      spinSpeed: number;
    }>,
    count: number,
    delta: number,
  ) => {
    if (!ref.current || count === 0) return;

    data.forEach((p, i) => {
      p.y -=
        delta * FALL_SPEED + Math.random() * windSpeed * WIND_FLUTTER_FACTOR;
      p.x += windVectorX * delta * WIND_ANIMATION_SPEED;
      p.z += windVectorZ * delta * WIND_ANIMATION_SPEED;
      p.rx += delta * p.spinSpeed;
      p.ry += delta * p.spinSpeed;

      if (p.y < -HALF_AREA) p.y = HALF_AREA;
      if (p.x > HALF_AREA) p.x = -HALF_AREA;
      else if (p.x < -HALF_AREA) p.x = HALF_AREA;
      if (p.z > HALF_AREA) p.z = -HALF_AREA;
      else if (p.z < -HALF_AREA) p.z = HALF_AREA;

      tempObject.position.set(p.x, p.y, p.z);
      tempObject.rotation.set(p.rx, p.ry, p.rz);
      tempObject.scale.set(p.scale, p.scale, p.scale);
      tempObject.updateMatrix();
      ref.current!.setMatrixAt(i, tempObject.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  };

  useFrame((_state, delta) => {
    updateParticles(sugiRef, sugiData, sugiCount, delta);
    updateParticles(hinokiRef, hinokiData, hinokiCount, delta);
  });

  return (
    <>
      {sugiGeometry && sugiCount > 0 && (
        <instancedMesh
          ref={sugiRef}
          args={[sugiGeometry, undefined, sugiCount]}
        >
          <meshStandardMaterial color="#eab308" roughness={0.8} />
        </instancedMesh>
      )}
      {hinokiGeometry && hinokiCount > 0 && (
        <instancedMesh
          ref={hinokiRef}
          args={[hinokiGeometry, undefined, hinokiCount]}
        >
          <meshStandardMaterial color="#ea580c" roughness={0.8} />
        </instancedMesh>
      )}
    </>
  );
}

useGLTF.preload('/sugi.glb');
useGLTF.preload('/hinoki.glb');
