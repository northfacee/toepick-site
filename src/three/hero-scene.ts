import * as THREE from "three";
import { makePhone, makeStar } from "./scene-objects";
import { BASE, type SiteLocale } from "../site-config";

export interface ShowcaseController {
  setMode: (mode: number) => void;
  dispose: () => void;
}
interface SceneOptions {
  mode: number;
  locale?: SiteLocale;
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
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  host.dataset.mode = String(options.mode);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0, 12.4);
  scene.add(new THREE.HemisphereLight("#ffffff", "#c9bdd7", 1.7));
  const key = new THREE.DirectionalLight("#fff9f4", 2.1);
  key.position.set(-4, 6, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight("#e4d9ff", 1.1);
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
  const phone = makePhone();
  const stars = [makeStar("#f8bfdf", 0.24), makeStar("#a1e5d5", 0.17)];
  scene.add(phone.group, ...stars);
  // A local radial texture grounds the floating phone without a hard-edged fake shadow.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    gradient.addColorStop(0, "rgba(45,32,64,0.22)");
    gradient.addColorStop(1, "rgba(45,32,64,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  textures.add(shadowTexture);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.7, 0.65),
    new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  shadow.position.set(0.1, -2.98, -0.4);
  scene.add(shadow);
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
      0.025 + current.hoverY * 0.025,
      THREE.MathUtils.clamp(
        -0.12 + current.drag + current.hoverX * 0.055 + current.scroll * 0.045,
        (-Math.PI * 25) / 180,
        (Math.PI * 25) / 180,
      ),
      -0.035 + current.hoverX * 0.008 + current.scroll * 0.025,
    );
    phone.group.position.y =
      0.08 + Math.sin(elapsed * 0.65) * 0.025 - current.scroll * 0.08;
    stars[0].position.set(-1.85, 1.85 + Math.sin(elapsed * 0.7) * 0.035, -0.25);
    stars[1].position.set(1.8, -1.85 + Math.sin(elapsed * 0.6) * 0.035, -0.35);
    stars.forEach((star, i) =>
      star.rotation.set(
        0.1,
        -0.15 + Math.sin(elapsed * 0.4 + i) * 0.05,
        i * 0.3 - 0.15,
      ),
    );
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
    camera.position.z = camera.aspect < 0.72 ? 13.8 : 12.4;
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
  const showcasePrefix =
    options.locale && options.locale !== "ko"
      ? `${BASE}showcase/${options.locale}/`
      : `${BASE}showcase/`;
  const load = (file: string) =>
    loader.loadAsync(`${showcasePrefix}${file}.svg`).then((texture) => {
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
  Promise.all(["listening", "reading", "words"].map(load))
    .then((loaded) => {
      if (disposed) return;
      faceTextures.push(...loaded.slice(0, 3));
      phone.screen.material.map = faceTextures[mode];
      phone.screen.material.needsUpdate = true;
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
