'use client';

import { useState, useRef, useEffect, memo, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useTexture, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';

// Optimized 3D Project Card component
const ProjectCard = memo(({ project, index, totalProjects, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Memoize position calculations
  const { x, z, angle } = useMemo(() => {
    const angle = (index / totalProjects) * Math.PI * 2;
    const radius = 5;
    return {
      x: Math.sin(angle) * radius,
      z: Math.cos(angle) * radius,
      angle
    };
  }, [index, totalProjects]);

  // Load texture for project image
  const texture = useTexture(project.image);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() + index) * 0.1;
      if (hovered) {
        meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
      }
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
        if (typeof document !== 'undefined') document.body.style.cursor = 'none';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== 'undefined') document.body.style.cursor = 'none';
      }}
    >
      <mesh position={[0, 0, 0]} scale={hovered ? 1.15 : 1}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      <Text
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>

      <Text
        position={[0, -1.5, 0]}
        fontSize={0.12}
        color="#88ccff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.tags?.slice(0, 3).join(' | ')}
      </Text>
    </group>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Component for continuous rotation
const RotatingGroup = memo(({ projects, onProjectSelect }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <Suspense key={index} fallback={null}>
          <ProjectCard
            project={project}
            index={index}
            totalProjects={projects.length}
            onClick={onProjectSelect}
          />
        </Suspense>
      ))}
    </group>
  );
});

RotatingGroup.displayName = 'RotatingGroup';

// Main component that wraps the 3D project showcase in a Canvas
const ThreeDProjectShowcase = memo(({ projects, onSelectProject }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validProjects = useMemo(() =>
    projects?.filter(p => p && p.image) || [],
    [projects]
  );

  if (!validProjects.length) return null;

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[550px] relative rounded-2xl bg-black/10 backdrop-blur-[2px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 1, 10], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#4488ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff4488" />

          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 8, Math.PI / 8]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <RotatingGroup projects={validProjects} onProjectSelect={onSelectProject} />
          </PresentationControls>
        </Canvas>
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-xl text-gray-400">
          Loading 3D Showcase...
        </div>
      )}
    </motion.div>
  );
});

ThreeDProjectShowcase.displayName = 'ThreeDProjectShowcase';

export default ThreeDProjectShowcase;