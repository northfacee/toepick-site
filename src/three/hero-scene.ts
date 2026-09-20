import * as THREE from "three";
import {
  makeCassette,
  makePhone,
  makeStar,
  makeWordCard,
} from "./scene-objects";
import { BASE } from "../site-config";

export interface ShowcaseController {
  setMode: (mode: number) => void;
  dispose: () => void;
}
interface SceneOptions {
  mode: number;
  onReady: () => void;
  onFailure: () => void;
}
/** Only imported in a visible, motion-enabled hero; never during static HTML rendering. */
export function createShowcase(
  host: HTMLDivElement,
  options: SceneOptions,
): ShowcaseController {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  host.dataset.mode = String(options.mode);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0, 14);
  scene.add(new THREE.HemisphereLight("#ffffff", "#c7b4de", 2.6));
  const key = new THREE.DirectionalLight("#fff7e6", 3.0);
  key.position.set(-4, 6, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight("#d5c4ff", 1.3);
  fill.position.set(4, 1, 3);
  scene.add(fill);
  let disposed = false,
    failed = false,
    ready = false,
    visible = false,
    frame = 0,
    last = 0,
    elapsed = 0,
    mode = options.mode;
  const textures = new Set<THREE.Texture>();
  const removers: (() => void)[] = [];
  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;
  const phone = makePhone(),
    cassette = makeCassette(),
    word = makeWordCard();
  const stars = [
    makeStar("#FFD43B", 0.51),
    makeStar("#FF873C", 0.33),
    makeStar("#cab0f4", 0.25),
  ];
  scene.add(phone.group, cassette.group, word.group, ...stars);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.91, 0.012, 5, 100),
    new THREE.MeshBasicMaterial({
      color: "#aa8acd",
      transparent: true,
      opacity: 0.6,
    }),
  );
  ring.position.z = -1.4;
  ring.rotation.x = 0.22;
  ring.rotation.y = 0.3;
  scene.add(ring);
  const faceTextures: THREE.Texture[] = [];
  const current = { drag: 0, hoverX: 0, hoverY: 0, scroll: 0 };
  const pointer = {
    id: -1,
    startX: 0,
    startY: 0,
    x: 0,
    drag: 0,
    hoverX: 0,
    hoverY: 0,
  };
  const positions = [
    [-2.03, 0.88, 0.75, 1.83, -1.28, 0.7],
    [-1.9, -1.37, 0.5, 1.96, 1.39, 0.4],
    [-2.05, 1.31, -0.6, 1.69, -0.86, 1.1],
  ];
  const listen = (
    target: EventTarget,
    name: string,
    callback: EventListener,
    options?: AddEventListenerOptions,
  ) => {
    target.addEventListener(name, callback, options);
    removers.push(() => target.removeEventListener(name, callback, options));
  };
  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    host.dataset.rendering = "paused";
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    stop();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    removers.forEach((remove) => remove());
    const geometries = new Set<THREE.BufferGeometry>(),
      materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        for (const mat of Array.isArray(object.material)
          ? object.material
          : [object.material])
          materials.add(mat);
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
    renderer.dispose();
    canvas.remove();
  };
  const fail = () => {
    if (disposed || failed) return;
    failed = true;
    dispose();
    options.onFailure();
  };
  function draw(now: number) {
    frame = 0;
    if (disposed || !ready || !visible || document.hidden) return;
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
    last = now;
    elapsed += dt;
    const lerp = 1 - Math.exp(-dt * 7);
    const rect = host.getBoundingClientRect();
    const scroll = THREE.MathUtils.clamp(-rect.top / (rect.height * 0.9), 0, 1);
    current.drag = THREE.MathUtils.lerp(current.drag, pointer.drag, lerp);
    current.hoverX = THREE.MathUtils.lerp(current.hoverX, pointer.hoverX, lerp);
    current.hoverY = THREE.MathUtils.lerp(current.hoverY, pointer.hoverY, lerp);
    current.scroll = THREE.MathUtils.lerp(current.scroll, scroll, lerp);
    phone.group.rotation.set(
      -0.05 + current.hoverY * 0.045,
      THREE.MathUtils.clamp(
        -0.18 + current.drag + current.hoverX * 0.08 + current.scroll * 0.12,
        (-Math.PI * 25) / 180,
        (Math.PI * 25) / 180,
      ),
      -0.1 + current.scroll * 0.13,
    );
    phone.group.position.y =
      0.08 + Math.sin(elapsed * 0.8) * 0.045 - current.scroll * 0.3;
    const target = positions[mode],
      spread = 1 + current.scroll * 0.24;
    cassette.group.position.lerp(
      new THREE.Vector3(target[0] * spread, target[1], target[2]),
      lerp,
    );
    word.group.position.lerp(
      new THREE.Vector3(target[3] * spread, target[4], target[5]),
      lerp,
    );
    cassette.group.rotation.set(
      0.14 + Math.sin(elapsed) * 0.035,
      -0.23,
      -0.19 + current.hoverX * 0.07,
    );
    word.group.rotation.set(
      -0.08,
      0.19,
      0.14 + Math.sin(elapsed * 0.75) * 0.035,
    );
    cassette.reels.forEach((reel) => {
      reel.rotation.z = elapsed * 0.3;
    });
    stars[0].position.set(1.8 * spread, 2.35 + Math.sin(elapsed) * 0.07, 0.3);
    stars[1].position.set(
      -1.74 * spread,
      -2.2 + Math.sin(elapsed + 0.7) * 0.08,
      0.6,
    );
    stars[2].position.set(-1.93 * spread, 2.41, -0.5);
    stars.forEach((star, i) => {
      star.rotation.set(
        0.15,
        0.2 + Math.sin(elapsed * 0.6 + i) * 0.15,
        elapsed * 0.06 + i * 0.3,
      );
    });
    try {
      renderer.render(scene, camera);
    } catch {
      fail();
      return;
    }
    host.dataset.rendering = "active";
    host.dataset.rotation = phone.group.rotation.y.toFixed(3);
    host.dataset.dragRotation = current.drag.toFixed(3);
    host.dataset.scroll = current.scroll.toFixed(3);
    frame = requestAnimationFrame(draw);
  }
  function start() {
    if (!disposed && ready && visible && !document.hidden && !frame)
      frame = requestAnimationFrame(draw);
  }
  function size() {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    // Keep the whole composition visible on narrow mobile stages.
    camera.position.z = camera.aspect < 0.78 ? 16.5 : 14.1;
    camera.updateProjectionMatrix();
    start();
  }
  const endDrag = () => {
    pointer.id = -1;
    pointer.drag = 0;
    host.dataset.dragging = "false";
  };
  listen(canvas, "pointerdown", ((e: PointerEvent) => {
    if (!e.isPrimary || e.button !== 0) return;
    pointer.id = e.pointerId;
    pointer.startX = e.clientX;
    pointer.startY = e.clientY;
    pointer.x = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    host.dataset.dragging = "true";
  }) as EventListener);
  listen(canvas, "pointermove", ((e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (e.pointerType === "mouse") {
      pointer.hoverX = THREE.MathUtils.clamp(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -1,
        1,
      );
      pointer.hoverY = THREE.MathUtils.clamp(
        ((e.clientY - rect.top) / rect.height) * 2 - 1,
        -1,
        1,
      );
    }
    if (pointer.id === e.pointerId) {
      if (
        e.pointerType === "touch" &&
        Math.abs(e.clientY - pointer.startY) >
          Math.abs(e.clientX - pointer.startX) + 8
      ) {
        endDrag();
        return;
      }
      pointer.x = e.clientX;
      pointer.drag = THREE.MathUtils.clamp(
        ((pointer.x - pointer.startX) / rect.width) * 1.8,
        (-Math.PI * 25) / 180,
        (Math.PI * 25) / 180,
      );
    }
  }) as EventListener);
  listen(canvas, "pointerup", endDrag);
  listen(canvas, "pointercancel", endDrag);
  listen(canvas, "lostpointercapture", endDrag);
  listen(canvas, "pointerleave", () => {
    pointer.hoverX = 0;
    pointer.hoverY = 0;
  });
  listen(canvas, "webglcontextlost", (event) => {
    event.preventDefault();
    fail();
  });
  listen(document, "visibilitychange", () => {
    if (document.hidden) {
      endDrag();
      stop();
    } else start();
  });
  resizeObserver = new ResizeObserver(size);
  resizeObserver.observe(host);
  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        endDrag();
        stop();
      }
    },
    { threshold: 0 },
  );
  intersectionObserver.observe(host);
  const loader = new THREE.TextureLoader();
  const load = (file: string) =>
    loader.loadAsync(`${BASE}showcase/${file}.svg`).then((texture) => {
      if (disposed) {
        texture.dispose();
        return texture;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        renderer.capabilities.getMaxAnisotropy(),
        4,
      );
      textures.add(texture);
      return texture;
    });
  // Each late load is disposed separately if the component unmounts while loading.
  Promise.all(["listening", "reading", "words", "word-card"].map(load))
    .then((loaded) => {
      if (disposed) return;
      faceTextures.push(...loaded.slice(0, 3));
      phone.screen.material.map = faceTextures[mode];
      phone.screen.material.needsUpdate = true;
      word.face.material.map = loaded[3];
      word.face.material.needsUpdate = true;
      const p = positions[mode];
      cassette.group.position.set(p[0], p[1], p[2]);
      word.group.position.set(p[3], p[4], p[5]);
      ready = true;
      size();
      options.onReady();
      start();
    })
    .catch(fail);
  size();
  return {
    setMode(next) {
      mode = THREE.MathUtils.clamp(next, 0, 2);
      host.dataset.mode = String(mode);
      if (ready) {
        phone.screen.material.map = faceTextures[mode];
        phone.screen.material.needsUpdate = true;
        start();
      }
    },
    dispose,
  };
}
