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
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.025,
    curveSegments: 16,
  });
  geometry.translate(0, 0, -depth / 2);
  return new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color, roughness: 0.48, metalness: 0.12 }),
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
    new THREE.MeshBasicMaterial({
      color: "#ffffff",
      side: THREE.FrontSide,
      toneMapped: false,
    }),
  );
}
export function makePhone() {
  const group = new THREE.Group();
  // A thin graphite frame leaves more room for the screen, with a soft metal edge.
  const body = plate(2.69, 5.56, 0.18, "#4b4a53", 0.37);
  group.add(body);
  const back = plate(2.65, 5.5, 0.06, "#24242b", 0.36);
  back.position.z = -0.08;
  group.add(back);
  const front = plate(2.64, 5.51, 0.045, "#19191f", 0.35);
  front.position.z = 0.1;
  group.add(front);
  const screen = texturedFace(2.48, 5.32, 0.28);
  screen.position.z = 0.151;
  group.add(screen);
  const button = plate(0.035, 0.51, 0.055, "#62616c", 0.015);
  button.position.set(1.365, 0.64, 0);
  group.add(button);
  for (const y of [0.83, 0.24]) {
    const volume = plate(0.035, 0.36, 0.055, "#62616c", 0.015);
    volume.position.set(-1.365, y, 0);
    group.add(volume);
  }
  return { group, screen };
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
  return solid(shape, 0.1, color);
}
