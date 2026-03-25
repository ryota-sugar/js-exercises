import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  AR_AREA_SIZE,
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
  // InstancedMeshにすることで、複数の花粉を効率的に描画できるようにする
  const sugiRef = useRef<THREE.InstancedMesh>(null);
  const hinokiRef = useRef<THREE.InstancedMesh>(null);

  // brenderで作成したスギとヒノキのモデルを読み込む
  const { nodes: sugiNodes } = useGLTF('/sugi.glb');
  const { nodes: hinokiNodes } = useGLTF('/hinoki.glb');

  // useMemoで再計算を防ぐ
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

  // 花粉の動く範囲
  const HALF_AREA = AR_AREA_SIZE / 2;

  // 花粉の初期位置と回転、スピン速度などのデータをランダムに生成する関数
  const createParticlesData = (num: number) => {
    return new Array(num).fill(0).map(() => ({
      // 位置の情報
      x: (Math.random() - 0.5) * AR_AREA_SIZE,
      y: (Math.random() - 0.5) * AR_AREA_SIZE,
      z: (Math.random() - 0.5) * AR_AREA_SIZE,
      // 回転の情報
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

  // 風のベクトルを計算する
  // 度数法からラジアンに変換するためにMath.PI / 180を掛ける
  const windRad = windDirection * (Math.PI / 180);
  // Yは重力の影響で下向きになるため、XとZの成分だけを計算する
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
    delta: number, // 前のフレームからの経過時間
  ) => {
    if (!ref.current || count === 0) return;

    data.forEach((p, i) => {
      p.y -=
        delta * FALL_SPEED + Math.random() * windSpeed * WIND_FLUTTER_FACTOR; // Y軸は重力と風の影響で下向きに動く
      p.x += windVectorX * delta * WIND_ANIMATION_SPEED; // X軸は風の影響で動く
      p.z += windVectorZ * delta * WIND_ANIMATION_SPEED; // Z軸は風の影響で動く
      p.rx += delta * p.spinSpeed; // 回転の更新
      p.ry += delta * p.spinSpeed; // 回転の更新

      // 花粉が一定の範囲を超えたら反対側に回してループさせる
      if (p.y < -HALF_AREA) p.y = HALF_AREA;
      if (p.x > HALF_AREA) p.x = -HALF_AREA;
      else if (p.x < -HALF_AREA) p.x = HALF_AREA;
      if (p.z > HALF_AREA) p.z = -HALF_AREA;
      else if (p.z < -HALF_AREA) p.z = HALF_AREA;

      // tempObjectに現在の花粉の位置、回転、スケールを設定してから、その行列をInstancedMeshに反映させる
      tempObject.position.set(p.x, p.y, p.z);
      tempObject.rotation.set(p.rx, p.ry, p.rz);
      tempObject.scale.set(p.scale, p.scale, p.scale);
      tempObject.updateMatrix();
      ref.current!.setMatrixAt(i, tempObject.matrix);
    });
    // インスタンスの行列が更新されたことをThree.jsに伝える(花粉が動いたことを反映させないと古い位置のままになる)
    ref.current.instanceMatrix.needsUpdate = true;
  };

  // マイフレームごとに花粉の位置や回転を更新する
  useFrame((_state, delta) => {
    updateParticles(sugiRef, sugiData, sugiCount, delta);
    updateParticles(hinokiRef, hinokiData, hinokiCount, delta);
  });

  return (
    <>
      {sugiGeometry && sugiCount > 0 && (
        <instancedMesh
          ref={sugiRef}
          args={[sugiGeometry, undefined, sugiCount]} // [ジオメトリ、マテリアル、インスタンス数]
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

// 事前にモデルをプリロードしておくことで、描画時の遅延を減らす
useGLTF.preload('/sugi.glb');
useGLTF.preload('/hinoki.glb');
