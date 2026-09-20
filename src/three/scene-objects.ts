import * as THREE from "three";

export const INK = "#292830";
export function roundedShape(width: number, height: number, radius: number) {
  const s = new THREE.Shape();
  const x = -width / 2,
    y = -height / 2,
    r = radius;
  s.moveTo(x + r, y);
  s.lineTo(x + width - r, y);
  s.quadraticCurveTo(x + width, y, x + width, y + r);
  s.lineTo(x + width, y + height - r);
  s.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  s.lineTo(x + r, y + height);
  s.quadraticCurveTo(x, y + height, x, y + height - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
function solid(shape: THREE.Shape, depth: number, color: string) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.025,
    curveSegments: 8,
  });
  geometry.translate(0, 0, -depth / 2);
  return new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color, roughness: 0.44, metalness: 0.08 }),
  );
}
export function plate(
  width: number,
  height: number,
  depth: number,
  color: string,
  radius = 0.12,
) {
  return solid(roundedShape(width, height, radius), depth, color);
}
export function texturedFace(width: number, height: number, radius: number) {
  const geometry = new THREE.ShapeGeometry(
    roundedShape(width, height, radius),
    12,
  );
  const position = geometry.getAttribute("position");
  const uv = geometry.getAttribute("uv");
  for (let i = 0; i < position.count; i++)
    uv.setXY(
      i,
      position.getX(i) / width + 0.5,
      position.getY(i) / height + 0.5,
    );
  return new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: "#fffcf5", side: THREE.FrontSide }),
  );
}
export function makePhone() {
  const group = new THREE.Group();
  const body = plate(2.73, 5.48, 0.32, INK, 0.37);
  group.add(body);
  const edge = plate(2.68, 5.4, 0.21, "#FF873C", 0.35);
  edge.position.z = -0.03;
  group.add(edge);
  const front = plate(2.68, 5.4, 0.08, INK, 0.35);
  front.position.z = 0.17;
  group.add(front);
  const screen = texturedFace(2.45, 5.1, 0.25);
  screen.position.z = 0.237;
  group.add(screen);
  const button = plate(0.06, 0.56, 0.08, INK, 0.02);
  button.position.set(1.39, 0.7, 0);
  group.add(button);
  for (const y of [0.75, 0.13]) {
    const volume = plate(0.06, 0.42, 0.08, INK, 0.02);
    volume.position.set(-1.39, y, 0);
    group.add(volume);
  }
  return { group, screen };
}
export function makeCassette() {
  const group = new THREE.Group();
  group.add(plate(2.13, 1.38, 0.24, INK));
  const cover = plate(2.06, 1.31, 0.13, "#FF873C");
  cover.position.z = 0.13;
  group.add(cover);
  const label = plate(1.75, 0.96, 0.045, "#fff5d4", 0.06);
  label.position.set(0, 0.05, 0.23);
  group.add(label);
  const window = plate(1.47, 0.47, 0.04, "#ad93db", 0.19);
  window.position.set(0, 0.02, 0.28);
  group.add(window);
  const reels: THREE.Group[] = [];
  for (const x of [-0.51, 0.51]) {
    const reel = new THREE.Group();
    reel.position.set(x, 0.02, 0.33);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.158, 0.035, 6, 24),
      new THREE.MeshStandardMaterial({ color: INK }),
    );
    reel.add(ring);
    for (let i = 0; i < 6; i++) {
      const spoke = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.28, 0.025),
        new THREE.MeshStandardMaterial({ color: "#fff8e4" }),
      );
      spoke.rotation.z = (i * Math.PI) / 3;
      reel.add(spoke);
    }
    group.add(reel);
    reels.push(reel);
  }
  for (const y of [0.38, -0.31]) {
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(1.43, 0.015, 0.012),
      new THREE.MeshBasicMaterial({ color: INK }),
    );
    line.position.set(0, y, 0.3);
    group.add(line);
  }
  for (const x of [-0.84, 0.84]) {
    const screw = new THREE.Mesh(
      new THREE.CircleGeometry(0.035, 12),
      new THREE.MeshBasicMaterial({ color: INK }),
    );
    screw.position.set(x, -0.51, 0.215);
    group.add(screw);
  }
  return { group, reels };
}
export function makeWordCard() {
  const group = new THREE.Group();
  group.add(plate(2.1, 1.4, 0.12, INK, 0.1));
  const face = texturedFace(2.04, 1.32, 0.08);
  face.position.z = 0.1;
  group.add(face);
  return { group, face };
}
export function makeStar(color: string, radius: number) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 + Math.PI / 2;
    const r = i % 2 === 0 ? radius : radius * 0.47;
    if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  shape.closePath();
  return solid(shape, 0.2, color);
}
