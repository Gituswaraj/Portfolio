'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Component for a rotating 3D model
const Model = ({ path, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(path);
  const modelRef = useRef();
  
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  );
};

// Main component that wraps the 3D model in a Canvas
const ThreeDModel = ({ 
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Set client-side flag and preload Three.js resources
  useEffect(() => {
    setIsClient(true);
    
    // Preload Three.js resources
    const preloadThreeResources = async () => {
      try {
        // Force Three.js to initialize
        new THREE.Scene();
        // Wait a moment to ensure resources are loaded
        setTimeout(() => setIsLoaded(true), 200);
      } catch (error) {
        console.error('Error preloading Three.js resources:', error);
        // Still set as loaded even if there's an error
        setIsLoaded(true);
      }
    };
    
    preloadThreeResources();

    // Preload the model
    if (modelPath) {
      useGLTF.preload(modelPath);
    }
  }, [modelPath]);

  // Render a placeholder if not on client side
  if (!isClient) {
    return (
      <div 
        className={`w-full h-full ${className} bg-gray-200 dark:bg-gray-800 flex items-center justify-center`}
        style={{ background: backgroundColor !== 'transparent' ? backgroundColor : undefined }}
      >
        <div className="text-gray-500 dark:text-gray-400">Loading 3D model...</div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {isLoaded && (
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: backgroundColor }}
          dpr={[1, 2]} // Limit pixel ratio for better performance
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <PresentationControls
            global
            zoom={1.5}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Model 
              path={modelPath} 
              scale={scale} 
              position={position} 
              rotation={rotation} 
            />
          </PresentationControls>
          <Environment preset="city" />
          {autoRotate && (
            <OrbitControls 
              autoRotate 
              enableZoom={enableZoom} 
              enablePan={enablePan} 
            />
          )}
        </Canvas>
      )}
    </motion.div>
  );
};

export default ThreeDModel;