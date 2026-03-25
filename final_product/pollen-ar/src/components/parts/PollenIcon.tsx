import { useGLTF, Float } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

export default function PollenIcon({
  modelPath,
  color,
}: {
  modelPath: string;
  color: string;
}) {
  const { nodes } = useGLTF(modelPath); // gltfモデルを読み込む モデル内の全てのメッシュがnodesに格納される
  // nodesから最初のMeshを見つけて、そのジオメトリを取得
  const geometry = useMemo(
    () =>
      Object.values(nodes).find((n): n is THREE.Mesh => n instanceof THREE.Mesh)
        ?.geometry as THREE.BufferGeometry,
    [nodes],
  );

  if (!geometry) return null;

  return (
    // 浮遊アニメーション
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <mesh geometry={geometry} scale={1.2}>
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </Float>
  );
}
