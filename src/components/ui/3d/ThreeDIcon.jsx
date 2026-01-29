'use client';

import { useRef, useState, useEffect, memo, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Box as DreiBox,
  Sphere,
  Torus,
  Cylinder,
  Cone,
  Ring,
  Octahedron,
  Icosahedron,
  TorusKnot,
} from '@react-three/drei';
import { motion } from 'framer-motion';

// Optimized 3D shape with reduced geometry complexity
const IconShape = memo(({ shape = 'box', color = '#4285F4', hoverColor = '#5C9CFF' }) => {
  const meshRef = useRef();
  const [currentColor, setCurrentColor] = useState(color);

  useFrame((state) => {
    if (meshRef.current) {
      // Simplified animation - less CPU intensive
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.008;
    }
  });

  // Memoize the shape to prevent re-creation
  const shapeElement = useMemo(() => {
    // Reduced polygon counts for better performance
    const shapeProps = { ref: meshRef };

    switch (shape.toLowerCase()) {
      case 'sphere':
        return <Sphere {...shapeProps} args={[1, 16, 16]} />;
      case 'torus':
        return <Torus {...shapeProps} args={[0.7, 0.3, 12, 24]} />;
      case 'cylinder':
        return <Cylinder {...shapeProps} args={[1, 1, 2, 16]} />;
      case 'cone':
        return <Cone {...shapeProps} args={[1, 2, 16]} />;
      case 'box':
        return <DreiBox {...shapeProps} args={[1.5, 1.5, 1.5]} />;
      case 'ring':
        return <Ring {...shapeProps} args={[0.5, 1, 16]} />;
      case 'octahedron':
        return <Octahedron {...shapeProps} args={[1, 0]} />;
      case 'icosahedron':
        return <Icosahedron {...shapeProps} args={[1, 0]} />;
      case 'torusknot':
        return <TorusKnot {...shapeProps} args={[0.6, 0.2, 64, 8]} />;
      case 'lathe':
      case 'tetrahedron':
        return <Octahedron {...shapeProps} args={[1, 0]} />;
      case 'tube':
      case 'capsule':
        return <Cylinder {...shapeProps} args={[0.5, 0.5, 1.5, 12]} />;
      default:
        return <DreiBox {...shapeProps} args={[1.5, 1.5, 1.5]} />;
    }
  }, [shape]);

  return (
    <mesh
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        setCurrentColor(hoverColor);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setCurrentColor(color);
      }}
    >
      {shapeElement}
      <meshStandardMaterial
        color={currentColor}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  );
});

IconShape.displayName = 'IconShape';

// Main component that wraps the 3D icon in a Canvas
const ThreeDIcon = memo(({
  shape = 'box',
  color = '#4285F4',
  hoverColor = '#5C9CFF',
  size = 100,
  className = '',
  skill = ''
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
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={1} // Fixed DPR for consistent performance
          gl={{
            antialias: false, // Disable for better performance
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
          frameloop="demand" // Only render when needed
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <IconShape shape={shape} color={color} hoverColor={hoverColor} />
        </Canvas>
      ) : (
        <div
          className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center"
        >
          <span className="text-xs text-gray-500 dark:text-gray-400">{skill}</span>
        </div>
      )}
    </motion.div>
  );
});

ThreeDIcon.displayName = 'ThreeDIcon';

// Map skill names to shapes and colors
export const getSkillIconProps = (skillName) => {
  const skillMap = {
    'Java': { shape: 'cylinder', color: '#f89820', hoverColor: '#ffac33' },
    'C++': { shape: 'box', color: '#044F88', hoverColor: '#0A6BBD' },
    'JavaScript': { shape: 'sphere', color: '#F7DF1E', hoverColor: '#FFF04D' },
    'React.js': { shape: 'torusknot', color: '#61DAFB', hoverColor: '#8AE7FF' },
    'Next.js': { shape: 'cylinder', color: '#000000', hoverColor: '#333333' },
    'Data Structures': { shape: 'octahedron', color: '#9C27B0', hoverColor: '#BA68C8' },
    'Team Collaboration': { shape: 'octahedron', color: '#4CAF50', hoverColor: '#81C784' },
    'Problem Solving': { shape: 'cone', color: '#FF5722', hoverColor: '#FF8A65' },
    'Analytical Thinking': { shape: 'icosahedron', color: '#2196F3', hoverColor: '#64B5F6' },
  };

  return skillMap[skillName] || { shape: 'box', color: '#4285F4', hoverColor: '#5C9CFF' };
};

export default ThreeDIcon;
