import * as THREE from "three";

export default class CameraTarget {
  constructor() {
    this.setGeometry()
    this.setMaterial()
    this.getMesh();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);    
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  }

  getMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(30, 0, 0);
    return this.mesh;
  }
}