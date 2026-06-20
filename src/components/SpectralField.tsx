"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Fixed, full-page spectral field.
   Color is driven primarily by vertical position — so it reads as calm,
   layered strata of light slowly drifting upward — gently warped by a slow
   flow field rather than isotropic noise blobs. A cursor "sensor" lens warms
   and brightens the field locally; a faint scan line sweeps across. As the
   page scrolls the whole field dims and settles, so content below the hero
   sits on a quiet living surface instead of flat black. */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;   // uv space, 0..1
  uniform float uMouseOn; // 0..1 ease for cursor presence
  uniform float uScroll;  // 0 at top → 1 at bottom (smoothed)
  uniform float uReduced;

  // Ashima simplex noise
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m; m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  // violet → indigo → magenta → crimson ramp (the identity)
  vec3 spectral(float t){
    t=clamp(t,0.0,1.0);
    vec3 violet =vec3(0.482,0.302,1.000);
    vec3 indigo =vec3(0.365,0.420,1.000);
    vec3 magenta=vec3(0.725,0.302,1.000);
    vec3 crimson=vec3(1.000,0.231,0.361);
    vec3 crimson2=vec3(1.000,0.380,0.471);
    vec3 c=mix(violet,indigo,smoothstep(0.0,0.25,t));
    c=mix(c,magenta,smoothstep(0.25,0.5,t));
    c=mix(c,crimson,smoothstep(0.5,0.8,t));
    c=mix(c,crimson2,smoothstep(0.8,1.0,t));
    return c;
  }

  void main(){
    vec2 uv=vUv;
    vec2 p=uv-0.5; p.x*=uRes.x/uRes.y;
    float t = uReduced>0.5 ? 5.0 : uTime;

    // slow flow field — two low-frequency octaves only, kept gentle so the
    // strata read as coherent waves of light rather than random splotches.
    float flow  = snoise(vec2(p.x*0.55 + t*0.020, p.y*0.42 - t*0.012));
    flow += 0.45 * snoise(vec2(p.x*1.10 - t*0.014, p.y*0.95 + t*0.022));

    // spectral position is mostly vertical, drifting slowly upward, warped by
    // the flow. This is what gives the field its "sense" of direction.
    float band = uv.y * 0.92 - t*0.018 + flow*0.14;
    band = fract(band);                 // wrap into a continuous spectrum loop
    float wave = sin(band*6.2831853);   // soft layered brightness within strata

    // cursor sensor lens → warm (push toward crimson) + brighten locally
    vec2 m=uMouse-0.5; m.x*=uRes.x/uRes.y;
    float d=length(p-m);
    float lens=smoothstep(0.34,0.0,d)*uMouseOn;

    // faint sweeping scan line
    float scanX=fract(t*0.045);
    float scan=smoothstep(0.035,0.0,abs(uv.x-scanX))*0.5;

    float hue=clamp(band + lens*0.28 + scan*0.10, 0.0, 1.0);
    vec3 col=spectral(hue);

    // brightness: gentle base + strata shading + lens + scan
    float intensity = 0.16 + 0.10*wave + lens*0.5 + scan*0.18;
    col *= intensity;

    // vignette + a whisper of cold violet in the dark
    float vig=smoothstep(1.25,0.20,length(p));
    col = col*vig + vec3(0.015,0.016,0.038)*vig;

    // scroll settles the field: dimmer and calmer below the hero
    float dim = mix(1.0, 0.22, smoothstep(0.0, 0.55, uScroll));
    col *= dim;

    gl_FragColor=vec4(col,1.0);
  }
`;

function Field({ reduced }: { reduced: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const mouse = useRef({ x: 0.7, y: 0.55, on: 0 });
  const targetOn = useRef(0);
  const scroll = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.7, 0.55) },
      uMouseOn: { value: 0 },
      uScroll: { value: 0 },
      uReduced: { value: reduced ? 1 : 0 },
    }),
    [reduced]
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
      targetOn.current = 1;
    };
    const onLeave = () => (targetOn.current = 0);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  useFrame((state) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    if (!reduced) u.uTime.value = state.clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);

    mouse.current.on += (targetOn.current - mouse.current.on) * 0.06;
    u.uMouse.value.set(mouse.current.x, mouse.current.y);
    u.uMouseOn.value = mouse.current.on;

    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const target = max > 0 ? Math.min(doc.scrollTop / max, 1) : 0;
    scroll.current += (target - scroll.current) * 0.08;
    u.uScroll.value = scroll.current;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function SpectralField() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
    setMounted(true);
  }, []);

  return (
    <>
      <div className="field" aria-hidden="true">
        {mounted && (
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            frameloop={reduced ? "demand" : "always"}
            camera={{ position: [0, 0, 1] }}
          >
            <Field reduced={reduced} />
          </Canvas>
        )}
      </div>
      <div className="field__veil" aria-hidden="true" />
    </>
  );
}
