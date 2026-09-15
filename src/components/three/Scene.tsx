"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, type ReactNode } from "react";
import {
  MASLOW_LEVELS,
  MCCLELLAND_NEEDS,
  THEORISTS,
  VROOM_FACTORS,
} from "@/data/slides";

export type SceneProps = {
  slide: number;
  /** highlighted Maslow level (0..4) or null */
  active: number | null;
  onHover: (i: number | null) => void;
  onPin: (i: number) => void;
};

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** frame-rate independent smoothing factor */
const smooth = (dt: number, speed = 6) => 1 - Math.exp(-speed * dt);

function useLayout() {
  const { viewport } = useThree();
  const narrow = viewport.width < 7.5;
  return {
    narrow,
    w: viewport.width,
    h: viewport.height,
    right: narrow ? 0 : viewport.width * 0.27,
    left: narrow ? 0 : -viewport.width * 0.27,
  };
}

type AppearProps = {
  children: ReactNode;
  position: [number, number, number];
  scale?: number;
  parallax?: number;
};

/** Group that scales in on mount and glides to its target position/scale. */
function Appear({ children, position, scale = 1, parallax = 0.14 }: AppearProps) {
  const ref = useRef<THREE.Group>(null);
  const cur = useRef({ s: 0, x: position[0], y: position[1], z: position[2] });

  useFrame(({ pointer }, dt) => {
    const g = ref.current;
    if (!g) return;
    const c = cur.current;
    const k = smooth(dt, 5);
    c.s += (scale - c.s) * k;
    c.x += (position[0] - c.x) * k;
    c.y += (position[1] - c.y) * k;
    c.z += (position[2] - c.z) * k;
    g.scale.setScalar(c.s);
    g.position.set(c.x, c.y, c.z);
    g.rotation.x += (-pointer.y * parallax - g.rotation.x) * smooth(dt, 3);
    g.rotation.y += (pointer.x * parallax - g.rotation.y) * smooth(dt, 3);
  });

  return <group ref={ref}>{children}</group>;
}

function Spin({ children, speed = 0.2, axis = "y" }: { children: ReactNode; speed?: number; axis?: "x" | "y" | "z" }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation[axis] += dt * speed;
  });
  return <group ref={ref}>{children}</group>;
}

/* ------------------------------------------------------------------ */
/* Maslow pyramid                                                      */
/* ------------------------------------------------------------------ */

const LEVEL_H = 0.6;
const LEVEL_GAP = 0.07;
const BASE_R = 2.0;
const TOTAL_H = MASLOW_LEVELS.length * (LEVEL_H + LEVEL_GAP);

type LevelProps = {
  i: number;
  active: number | null;
  wire: boolean;
  interactive: boolean;
  onHover: (i: number | null) => void;
  onPin: (i: number) => void;
};

function PyramidLevel({ i, active, wire, interactive, onHover, onPin }: LevelProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const y0 = i * (LEVEL_H + LEVEL_GAP);
  const y1 = y0 + LEVEL_H;
  const rBottom = BASE_R * (1 - y0 / TOTAL_H);
  const rTop = Math.max(0, BASE_R * (1 - y1 / TOTAL_H));
  const color = MASLOW_LEVELS[i].color;
  const isActive = active === i;
  const dimmed = active !== null && !isActive;

  useFrame((_, dt) => {
    const m = mesh.current;
    const mt = mat.current;
    if (!m || !mt) return;
    const k = smooth(dt, 8);
    const targetScale = isActive ? 1.1 : 1;
    const targetOpacity = wire ? 0.45 : dimmed ? 0.3 : 1;
    const targetEmissive = isActive ? 1.1 : wire ? 0.3 : 0.28;
    m.scale.x += (targetScale - m.scale.x) * k;
    m.scale.z = m.scale.x;
    mt.opacity += (targetOpacity - mt.opacity) * k;
    mt.emissiveIntensity += (targetEmissive - mt.emissiveIntensity) * k;
  });

  return (
    <mesh
      ref={mesh}
      position={[0, y0 + LEVEL_H / 2 - TOTAL_H / 2, 0]}
      rotation={[0, Math.PI / 4, 0]}
      onPointerOver={
        interactive
          ? (e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              onHover(i);
            }
          : undefined
      }
      onPointerOut={
        interactive
          ? () => {
              document.body.style.cursor = "";
              onHover(null);
            }
          : undefined
      }
      onClick={
        interactive
          ? (e) => {
              e.stopPropagation();
              onPin(i);
            }
          : undefined
      }
    >
      <cylinderGeometry args={[rTop, rBottom, LEVEL_H, 4, 1]} />
      <meshStandardMaterial
        ref={mat}
        color={color}
        emissive={color}
        emissiveIntensity={0.28}
        roughness={0.35}
        metalness={0.2}
        flatShading
        transparent
        wireframe={wire}
      />
    </mesh>
  );
}

type PyramidProps = {
  position: [number, number, number];
  scale?: number;
  wire?: boolean;
  interactive?: boolean;
  active: number | null;
  onHover: (i: number | null) => void;
  onPin: (i: number) => void;
};

function Pyramid({ position, scale = 1, wire = false, interactive = false, active, onHover, onPin }: PyramidProps) {
  return (
    <Appear position={position} scale={scale}>
      <Spin speed={interactive ? 0.28 : 0.18}>
        <group rotation={[0.12, 0, 0]}>
          {MASLOW_LEVELS.map((_, i) => (
            <PyramidLevel
              key={i}
              i={i}
              active={interactive ? active : null}
              wire={wire}
              interactive={interactive}
              onHover={onHover}
              onPin={onPin}
            />
          ))}
          {/* base plate */}
          <mesh position={[0, -TOTAL_H / 2 - 0.09, 0]} rotation={[0, Math.PI / 4, 0]}>
            <cylinderGeometry args={[BASE_R * 1.12, BASE_R * 1.12, 0.08, 4]} />
            <meshStandardMaterial color="#1b2447" roughness={0.6} metalness={0.3} transparent opacity={wire ? 0.2 : 0.9} />
          </mesh>
        </group>
      </Spin>
    </Appear>
  );
}

/* ------------------------------------------------------------------ */
/* Herzberg — two interlocking rings                                   */
/* ------------------------------------------------------------------ */

function TwoFactors({ position, scale = 1, dim = false }: { position: [number, number, number]; scale?: number; dim?: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) {
      a.current.rotation.x += dt * 0.45;
      a.current.rotation.y += dt * 0.2;
    }
    if (b.current) {
      b.current.rotation.y -= dt * 0.4;
      b.current.rotation.z += dt * 0.25;
    }
  });
  const o = dim ? 0.35 : 1;
  return (
    <Appear position={position} scale={scale}>
      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh ref={a} position={[-0.6, 0, 0]}>
          <torusGeometry args={[1.15, 0.3, 40, 120]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} metalness={0.55} roughness={0.25} transparent opacity={o} />
        </mesh>
        <mesh ref={b} position={[0.6, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.15, 0.3, 40, 120]} />
          <meshStandardMaterial color="#f5b942" emissive="#f5b942" emissiveIntensity={0.4} metalness={0.55} roughness={0.25} transparent opacity={o} />
        </mesh>
      </Float>
    </Appear>
  );
}

/* ------------------------------------------------------------------ */
/* McClelland — three orbiting needs                                   */
/* ------------------------------------------------------------------ */

function ThreeNeeds({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const orbs = useRef<(THREE.Mesh | null)[]>([]);
  const rings = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    MCCLELLAND_NEEDS.forEach((_, i) => {
      const m = orbs.current[i];
      if (!m) return;
      const a = t * 0.7 + (i * Math.PI * 2) / 3;
      const tilt = (i - 1) * 0.5;
      m.position.set(Math.cos(a) * 1.9, Math.sin(a) * Math.sin(tilt) * 1.9 + Math.sin(t * 1.3 + i) * 0.15, Math.sin(a) * Math.cos(tilt) * 1.9);
    });
    if (rings.current) rings.current.rotation.y += dt * 0.15;
  });
  return (
    <Appear position={position} scale={scale}>
      {/* core */}
      <Spin speed={0.35}>
        <mesh>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.28} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.55, 48, 48]} />
          <meshStandardMaterial color="#ffffff" emissive="#dbe5ff" emissiveIntensity={0.55} roughness={0.2} metalness={0.4} />
        </mesh>
      </Spin>
      {/* orbit rings */}
      <group ref={rings}>
        {MCCLELLAND_NEEDS.map((n, i) => (
          <mesh key={n.key} rotation={[Math.PI / 2 + (i - 1) * 0.5, 0, 0]}>
            <torusGeometry args={[1.9, 0.012, 8, 140]} />
            <meshBasicMaterial color={n.color} transparent opacity={0.45} />
          </mesh>
        ))}
      </group>
      {/* orbs */}
      {MCCLELLAND_NEEDS.map((n, i) => (
        <mesh
          key={n.key}
          ref={(el) => {
            orbs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.36, 40, 40]} />
          <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.7} roughness={0.25} metalness={0.3} />
        </mesh>
      ))}
    </Appear>
  );
}

/* ------------------------------------------------------------------ */
/* Vroom — expectancy chain E → I → V                                  */
/* ------------------------------------------------------------------ */

const CHAIN: [number, number, number][] = [
  [-1.7, -1.35, 0],
  [0, 0, 0],
  [1.7, 1.35, 0],
];

function Tube({ a, b, color, opacity = 0.55 }: { a: [number, number, number]; b: [number, number, number]; color: string; opacity?: number }) {
  const { pos, quat, len } = useMemo(() => {
    const va = new THREE.Vector3(...a);
    const vb = new THREE.Vector3(...b);
    const dir = vb.clone().sub(va);
    const len = dir.length();
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return { pos: va.clone().add(vb).multiplyScalar(0.5), quat, len };
  }, [a, b]);
  return (
    <mesh position={pos} quaternion={quat}>
      <cylinderGeometry args={[0.055, 0.055, len, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={opacity} />
    </mesh>
  );
}

function Chain({ position, scale = 1, dim = false }: { position: [number, number, number]; scale?: number; dim?: boolean }) {
  const pulse = useRef<THREE.Mesh>(null);
  const nodes = useRef<(THREE.Mesh | null)[]>([]);
  const pts = useMemo(() => CHAIN.map((p) => new THREE.Vector3(...p)), []);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.35) % 1;
    const seg = t < 0.5 ? 0 : 1;
    const local = (t - seg * 0.5) / 0.5;
    if (pulse.current) {
      pulse.current.position.lerpVectors(pts[seg], pts[seg + 1], local);
    }
    nodes.current.forEach((n, i) => {
      if (!n) return;
      const d = pulse.current ? n.position.distanceTo(pulse.current.position) : 9;
      const s = 1 + Math.max(0, 0.35 - d) * 0.8;
      n.scale.setScalar(s);
    });
  });

  const o = dim ? 0.35 : 1;
  return (
    <Appear position={position} scale={scale} parallax={0.1}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
        <Tube a={CHAIN[0]} b={CHAIN[1]} color={VROOM_FACTORS[0].color} opacity={0.55 * o} />
        <Tube a={CHAIN[1]} b={CHAIN[2]} color={VROOM_FACTORS[1].color} opacity={0.55 * o} />
        {VROOM_FACTORS.map((f, i) => (
          <mesh
            key={f.key}
            position={CHAIN[i]}
            ref={(el) => {
              nodes.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.5 + i * 0.08, 48, 48]} />
            <meshStandardMaterial color={f.color} emissive={f.color} emissiveIntensity={0.6} roughness={0.25} metalness={0.35} transparent opacity={o} />
          </mesh>
        ))}
        <mesh ref={pulse}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Float>
    </Appear>
  );
}

/* ------------------------------------------------------------------ */
/* Hero object for title / conclusion                                  */
/* ------------------------------------------------------------------ */

function Hero({ position, scale = 1, opacity = 1 }: { position: [number, number, number]; scale?: number; opacity?: number }) {
  const orbs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    THEORISTS.forEach((_, i) => {
      const m = orbs.current[i];
      if (!m) return;
      const a = t * 0.45 + (i * Math.PI) / 2;
      m.position.set(Math.cos(a) * 2.3, Math.sin(a * 0.9 + i) * 0.7, Math.sin(a) * 2.3);
    });
  });
  const o = opacity;
  return (
    <Appear position={position} scale={scale} parallax={0.18}>
      <Spin speed={0.12}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial color="#9fb4ff" wireframe transparent opacity={0.35 * o} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshStandardMaterial color="#f5b942" emissive="#f5b942" emissiveIntensity={0.45} roughness={0.3} metalness={0.5} flatShading transparent opacity={o} />
        </mesh>
      </Spin>
      {THEORISTS.map((t, i) => (
        <mesh
          key={t.id}
          ref={(el) => {
            orbs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial color={t.color} emissive={t.color} emissiveIntensity={0.8} transparent opacity={o} />
        </mesh>
      ))}
    </Appear>
  );
}

/* ------------------------------------------------------------------ */
/* ambient decoration                                                  */
/* ------------------------------------------------------------------ */

function Ambient() {
  const L = useLayout();
  return (
    <>
      <Stars radius={70} depth={40} count={2600} factor={3.5} saturation={0} fade speed={0.5} />
      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-L.w * 0.47, L.h * 0.44, -4]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[L.w * 0.46, -L.h * 0.42, -5]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#f5b942" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[L.w * 0.35, L.h * 0.38, -7]}>
          <tetrahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#a78bfa" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* slide → object mapping                                              */
/* ------------------------------------------------------------------ */

function SlideObjects({ slide, active, onHover, onPin }: SceneProps) {
  const L = useLayout();
  const n = L.narrow;

  switch (slide) {
    case 0:
      return <Hero position={[0, n ? 2.4 : 2.1, -3.5]} scale={n ? 0.8 : 1.25} opacity={0.6} />;
    case 1:
      return <Hero position={[0, 0.2, -8]} scale={1.3} opacity={0.35} />;
    case 2:
      return <Pyramid position={[L.right * 1.55, -0.4, -4]} scale={n ? 0.5 : 0.9} wire active={null} onHover={onHover} onPin={onPin} />;
    case 3:
      return (
        <Pyramid
          position={[L.left * 0.95, n ? L.h * 0.22 : -0.1, 0]}
          scale={n ? 0.55 : 0.98}
          interactive
          active={active}
          onHover={onHover}
          onPin={onPin}
        />
      );
    case 4:
      return <TwoFactors position={[L.right * 1.6, 0.2, -4]} scale={n ? 0.5 : 0.9} dim />;
    case 5:
      return <TwoFactors position={[0, n ? L.h * 0.42 : -0.15, n ? -3 : -1.2]} scale={n ? 0.45 : 0.55} dim={n} />;
    case 6:
      return <ThreeNeeds position={[L.right * 1.05, n ? L.h * 0.25 : -0.2, 0]} scale={n ? 0.55 : 0.95} />;
    case 7:
      return <Chain position={[L.right * 1.6, 0.2, -4]} scale={n ? 0.5 : 0.9} dim />;
    case 8:
      return <Chain position={[L.right * 1.05, n ? L.h * 0.25 : -0.6, 0]} scale={n ? 0.55 : 0.9} />;
    default:
      return <Hero position={[L.right * 1.3, 0.6, -10]} scale={1.6} opacity={0.3} />;
  }
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export default function Scene(props: SceneProps) {
  return (
    <div className="deck-canvas" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 6]} intensity={2.2} />
        <pointLight position={[-7, -3, 4]} color="#38bdf8" intensity={60} />
        <pointLight position={[7, 4, -2]} color="#f5b942" intensity={45} />
        <Ambient />
        <SlideObjects {...props} />
      </Canvas>
    </div>
  );
}
