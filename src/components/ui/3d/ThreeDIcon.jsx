'use client';

import { useRef, useState, useEffect, memo, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Box as DreiBox,
  Sphere,
  Torus,
  Cylinder,
  Cone,
  Octahedron,
  Icosahedron,
  TorusKnot,
  MeshWobbleMaterial,
  Float,
  Decal,
  useTexture
} from '@react-three/drei';
import { motion } from 'framer-motion';

// Component to render the logo on the 3D shape
const LogoDecal = ({ url }) => {
  const texture = useTexture(url);
  return (
    <Decal
      position={[0, 0, 0.76]}
      rotation={[0, 0, 0]}
      scale={[1.1, 1.1, 1.1]}
    >
      <meshStandardMaterial
        map={texture}
        transparent
        polygonOffset
        polygonOffsetFactor={-10}
      />
    </Decal>
  );
};

// Enhanced 3D shape with Logo Decals
const IconShape = memo(({ shape = 'box', color = '#4285F4', hoverColor = '#5C9CFF', logoUrl }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Memoize the geometry settings
  const geometrySlots = useMemo(() => {
    switch (shape.toLowerCase()) {
      case 'sphere': return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus': return <torusGeometry args={[0.7, 0.3, 16, 32]} />;
      case 'cylinder': return <cylinderGeometry args={[1, 1, 2, 32]} />;
      case 'cone': return <coneGeometry args={[1, 2, 32]} />;
      case 'box': return <boxGeometry args={[1.5, 1.5, 1.5]} />;
      case 'octahedron': return <octahedronGeometry args={[1.2, 0]} />;
      case 'icosahedron': return <icosahedronGeometry args={[1.2, 0]} />;
      case 'torusknot': return <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />;
      default: return <boxGeometry args={[1.5, 1.5, 1.5]} />;
    }
  }, [shape]);

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometrySlots}
        <MeshWobbleMaterial
          color={hovered ? hoverColor : color}
          factor={hovered ? 0.4 : 0.1}
          speed={2}
          metalness={0.6}
          roughness={0.2}
          emissive={hovered ? hoverColor : color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
        {logoUrl && (
          <Suspense fallback={null}>
            <LogoDecal url={logoUrl} />
          </Suspense>
        )}
      </mesh>
    </Float>
  );
});

IconShape.displayName = 'IconShape';

// Main component that wraps the 3D icon in a Canvas
const ThreeDIcon = memo(({
  shape = 'box',
  color = '#4285F4',
  hoverColor = '#5C9CFF',
  logoUrl = '',
  size = 100,
  className = '',
  skill = ''
}) => {
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

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`${className} relative cursor-pointer`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
    >
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
          <IconShape shape={shape} color={color} hoverColor={hoverColor} logoUrl={logoUrl} />
        </Canvas>
      ) : (
        <div className="w-full h-full bg-blue-500/5 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center border border-dashed border-blue-500/20 backdrop-blur-sm">
          <span className="text-[10px] text-gray-500 text-center px-1 font-medium">{skill}</span>
        </div>
      )}

      {/* Background Glow */}
      {isVisible && (
        <div
          className="absolute inset-0 pointer-events-none -z-10 blur-3xl opacity-10 transition-opacity duration-500"
          style={{ backgroundColor: color }}
        />
      )}
    </motion.div>
  );
});

ThreeDIcon.displayName = 'ThreeDIcon';

// Premium Mapping for Skills with official Logos
export const getSkillIconProps = (skillName) => {
  const skillMap = {
    // Technical Skills
    'JavaScript': {
      shape: 'box',
      color: '#F7DF1E',
      hoverColor: '#FFF45E',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    'React.js': {
      shape: 'torusknot',
      color: '#20232A',
      hoverColor: '#61DAFB',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    'Next.js': {
      shape: 'cylinder',
      color: '#ffffff',
      hoverColor: '#000000',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    },
    'C++': {
      shape: 'octahedron',
      color: '#00599C',
      hoverColor: '#004482',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
    },
    'MongoDB': {
      shape: 'box',
      color: '#13AA52',
      hoverColor: '#118D4B',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    'TypeScript': {
      shape: 'box',
      color: '#3178C6',
      hoverColor: '#2D69AF',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    'Node.js': {
      shape: 'cylinder',
      color: '#339933',
      hoverColor: '#2B7A2B',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    'Express.js': {
      shape: 'box',
      color: '#000000',
      hoverColor: '#222222',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
    },
    'MySQL': {
      shape: 'torus',
      color: '#4479A1',
      hoverColor: '#00758F',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
    },
    'SQL': {
      shape: 'cylinder',
      color: '#336791',
      hoverColor: '#003B63',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    },
    'Git': {
      shape: 'box',
      color: '#F05032',
      hoverColor: '#D83E22',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    },

    // Soft Skills
    'Team Collaboration': { shape: 'sphere', color: '#FF4785', hoverColor: '#FF7FAC' },
    'Problem Solving': { shape: 'cone', color: '#FFAE00', hoverColor: '#FFD700' },
    'Creative Thinking': { shape: 'torusknot', color: '#9C27B0', hoverColor: '#E040FB' },
    'Project Management': { shape: 'cylinder', color: '#00BCD4', hoverColor: '#80DEEA' },
    'Data-Driven': { shape: 'icosahedron', color: '#4CAF50', hoverColor: '#A5D6A7' },
  };

  return skillMap[skillName] || { shape: 'box', color: '#4285F4', hoverColor: '#5C9CFF' };
};

export default ThreeDIcon;
