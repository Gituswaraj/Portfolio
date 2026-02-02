'use client';

import { useRef, useEffect, useState, memo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';

// Optimized Model component with proper suspense support
const Model = memo(({ path, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = true }) => {
  const { scene } = useGLTF(path);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene.clone()} // Clone to prevent shared state issues
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
});

Model.displayName = 'Model';

// Loading placeholder for 3D model
const ModelLoader = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#444" wireframe />
  </mesh>
);

// Main component that wraps the 3D model in a Canvas
const ThreeDModel = memo(({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  enableZoom = false,
  enablePan = false,
  className = '',
  backgroundColor = 'transparent'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preload the model when visible
  useEffect(() => {
    if (isVisible && modelPath) {
      useGLTF.preload(modelPath);
    }
  }, [isVisible, modelPath]);

  return (
    <motion.div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: backgroundColor }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1} />

          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Suspense fallback={<ModelLoader />}>
              <Model
                path={modelPath}
                scale={scale}
                position={position}
                rotation={rotation}
                autoRotate={autoRotate}
              />
            </Suspense>
          </PresentationControls>

          <Environment preset="city" />

          <OrbitControls
            enableZoom={enableZoom}
            enablePan={enablePan}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      ) : (
        <div
          className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg"
          style={{ background: backgroundColor !== 'transparent' ? backgroundColor : undefined }}
        >
          <div className="text-gray-500 dark:text-gray-400 animate-pulse">Loading 3D...</div>
        </div>
      )}
    </motion.div>
  );
});

ThreeDModel.displayName = 'ThreeDModel';

export default ThreeDModel;