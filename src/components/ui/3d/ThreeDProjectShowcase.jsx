'use client';

import { useState, useRef, useEffect, memo, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';

// Optimized 3D Project Card component
const ProjectCard = memo(({ project, index, totalProjects, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Memoize position calculations
  const { x, z, angle } = useMemo(() => {
    const angle = (index / totalProjects) * Math.PI * 2;
    const radius = 4;
    return {
      x: Math.sin(angle) * radius,
      z: Math.cos(angle) * radius,
      angle
    };
  }, [index, totalProjects]);

  // Load texture for project image with error handling
  const texture = useTexture(project.image);

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
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
      <mesh position={[0, 0, 0]} scale={hovered ? 1.08 : 1}>
        <planeGeometry args={[2, 1.5]} />
        <meshBasicMaterial map={texture} transparent opacity={0.95} />
      </mesh>

      <Text
        position={[0, -1, 0]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {project.title}
      </Text>

      <Text
        position={[0, -1.25, 0]}
        fontSize={0.09}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.tags.slice(0, 3).join(' • ')}
      </Text>
    </group>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Component for continuous rotation - optimized
const RotatingGroup = memo(({ projects, onProjectSelect }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <Suspense key={project.id || index} fallback={null}>
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
const ThreeDProjectShowcase = memo(({ projects, onProjectSelect }) => {
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

  const handleProjectClick = (project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  // Filter valid projects (those with images)
  const validProjects = useMemo(() =>
    projects?.filter(p => p && p.image) || [],
    [projects]
  );

  if (!validProjects.length) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[500px] rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={1}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false
          }}
          frameloop="demand"
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.7} />

          <PresentationControls
            global
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 6, Math.PI / 6]}
            azimuth={[-Math.PI / 6, Math.PI / 6]}
          >
            <RotatingGroup projects={validProjects} onProjectSelect={handleProjectClick} />
          </PresentationControls>
        </Canvas>
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-xl">
          <div className="text-gray-500 dark:text-gray-400 animate-pulse">Loading showcase...</div>
        </div>
      )}
    </motion.div>
  );
});

ThreeDProjectShowcase.displayName = 'ThreeDProjectShowcase';

export default ThreeDProjectShowcase;