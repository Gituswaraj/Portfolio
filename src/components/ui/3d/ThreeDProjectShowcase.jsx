'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Project Card component
const ProjectCard = ({ project, index, totalProjects, onClick }) => {
  const { viewport } = useThree();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  
  // Calculate position in 3D space based on index
  const angle = (index / totalProjects) * Math.PI * 2;
  const radius = 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  // Load texture for project image
  const texture = useTexture(project.image, (loadedTexture) => {
    setTextureLoaded(true);
  });
  
  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });
  
  return (
    <group
      position={[x, 0, z]}
      rotation={[0, -angle, 0]}
      ref={meshRef}
      onClick={() => onClick(project)}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh position={[0, 0, 0]} scale={hovered ? 1.1 : 1}>
        <planeGeometry args={[2, 1.5]} />
        <meshBasicMaterial map={texture} transparent opacity={0.9} />
      </mesh>
      
      <Text
        position={[0, -1, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
      
      <Text
        position={[0, -1.3, 0]}
        fontSize={0.1}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.tags.join(' • ')}
      </Text>
    </group>
  );
};

// Main component that wraps the 3D project showcase in a Canvas
const ThreeDProjectShowcase = ({ projects, onProjectSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
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
  }, []);
  
  const handleProjectClick = (project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  // Render a placeholder if not on client side
  if (!isClient) {
    return (
      <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading project showcase...</div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="w-full h-[500px] rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {isLoaded && (
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]} // Limit pixel ratio for better performance
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <PresentationControls
            global
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <RotatingGroup projects={projects} onProjectSelect={handleProjectClick} />
          </PresentationControls>
        </Canvas>
      )}
    </motion.div>
  );
};

// Component for continuous rotation
const RotatingGroup = ({ children, projects, onProjectSelect }) => {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Adjust rotation speed here
    }
  });
  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          index={index}
          totalProjects={projects.length}
          onClick={onProjectSelect}
        />
      ))}
    </group>
  );
};

export default ThreeDProjectShowcase;