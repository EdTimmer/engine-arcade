import * as THREE from 'three'
import Experience from '../../Experience'

export default class GateFrame {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.physics = this.experience.physics;
    this.elapsedTime = this.experience.elapsedTime;
    // this.showWireframe = true;
    this.debug = this.experience.debug;

    // Initial Geometry Parameters
    this.geometryParams = {
      radius: 30,
      tube: 2,
      radialSegments: 64,
      tubularSegments: 35,
      arc: Math.PI * 2
    };

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Gate Frame')
    }

    this.setMaterial()
    this.setGeometry()
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ 
      color: '#000000', 
      wireframe: false, 
      transparent: false, 
      opacity: 1,
    });

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.material, 'wireframe').name('Wireframe')
      this.debugFolder.add(this.material, 'opacity').min(0).max(1).step(0.01).name('Opacity')
    }
  }

  setGeometry() {
    this.geometry = new THREE.TorusGeometry(
      this.geometryParams.radius, 
      this.geometryParams.tube, 
      this.geometryParams.radialSegments, 
      this.geometryParams.tubularSegments, 
      this.geometryParams.arc
    );

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.geometryParams, 'radius').min(0).max(100).step(1).name('Radius').onChange(() => this.updateGeometry());
      this.debugFolder.add(this.geometryParams, 'tube').min(0).max(100).step(1).name('Tube').onChange(() => this.updateGeometry());
      this.debugFolder.add(this.geometryParams, 'radialSegments').min(0).max(100).step(1).name('Radial Segments').onChange(() => this.updateGeometry());
      this.debugFolder.add(this.geometryParams, 'tubularSegments').min(0).max(100).step(1).name('Tubular Segments').onChange(() => this.updateGeometry());
      this.debugFolder.add(this.geometryParams, 'arc').min(0).max(Math.PI * 2).step(0.01).name('Arc Segments').onChange(() => this.updateGeometry());
    }
  }

  updateGeometry() {
    // Remove the old geometry
    this.mesh.geometry.dispose();
    this.scene.remove(this.mesh);

    // Create new geometry with updated parameters
    this.geometry = new THREE.TorusGeometry(
      this.geometryParams.radius, 
      this.geometryParams.tube, 
      this.geometryParams.radialSegments, 
      this.geometryParams.tubularSegments, 
      this.geometryParams.arc
    );

    // Update the mesh with new geometry
    this.mesh.geometry = this.geometry;
    this.scene.add(this.mesh);
  }

  getMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.meshPosition = this.mesh.position;
    // this.meshQuaternion = this.mesh.quaternion;

    return this.mesh;
  } 
}