import * as THREE from 'three'
import Experience from '../../Experience'

export default class GateSurface {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug;
    this.physics = this.experience.physics;
    this.elapsedTime = this.experience.elapsedTime;
    this.showWireframe = false;

    this.geometryParams = {
      radius: 30,
      height: 2,
      radialSegments: 32,
      tubularSegments: 35,
      arc: Math.PI * 2
    };

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Gate Surface')
    }

    this.setMaterial()
    this.setGeometry()
  }

  setGeometry() {
    this.geometry = new THREE.CylinderGeometry(
      this.geometryParams.radius,
      this.geometryParams.radius,
      this.geometryParams.height,
      this.geometryParams.radialSegments,
    );

    // Debug
    if (this.debug.active) {
      // this.debugFolder.add(this.geometryParams, 'radiusTop').min(0).max(100).step(1).name('Radius').onChange(() => this.updateGeometry());
      // this.debugFolder.add(this.geometryParams, 'radiusBottom').min(0).max(100).step(1).name('Radius Bottom').onChange(() => this.updateGeometry());
      this.debugFolder.add(this.geometryParams, 'height').min(0).max(400).step(1).name('Height').onChange(() => this.updateGeometry());
      this.debugFolder.add(this.geometryParams, 'radialSegments').min(0).max(100).step(1).name('Radial Segments').onChange(() => this.updateGeometry());
    }
  }

  updateGeometry() {
    // Remove the old geometry
    this.mesh.geometry.dispose();
    this.scene.remove(this.mesh);

    // Create new geometry with updated parameters
    this.geometry = new THREE.TorusGeometry(
      this.geometryParams.radius, 
      this.geometryParams.radius,
      this.geometryParams.height,
      this.geometryParams.radialSegments,
    );

    // Update the mesh with new geometry
    this.mesh.geometry = this.geometry;
    this.scene.add(this.mesh);
  }

  setMaterial() {
    this.material = new THREE.MeshPhysicalMaterial({ color: '#30312d', emissive: 'black' })

    this.material.roughness = 0.1;
    this.material.metalness = 0.2; //0.5
    this.material.transmission = 1;
    this.material.ior = 1.5;
    this.material.thickness = 0.5;
    this.wireframe = this.showWireframe;

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.material, 'wireframe').name('Wireframe')
      this.debugFolder.add(this.material, 'opacity').min(0).max(1).step(0.01).name('Opacity')
      this.debugFolder.add(this.material, 'metalness').min(0).max(1).step(0.01).name('Metalness')
      this.debugFolder.add(this.material, 'roughness').min(0).max(1).step(0.01).name('Roughness')
      this.debugFolder.add(this.material, 'ior').min(0).max(2).step(0.01).name('IOR')
      this.debugFolder.add(this.material, 'transmission').min(0).max(1).step(0.01).name('Transmission')
      this.debugFolder.add(this.material, 'thickness').min(0).max(1).step(0.01).name('Thickness')
      this.debugFolder.addColor(this.material, 'color').name('Color')
      this.debugFolder.addColor(this.material, 'emissive').name('Emissive')
      this.debugFolder.add(this.material, 'transparent').name('Transparent')
    }
  }

  getMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotateX(Math.PI / 2);

    // this.meshPosition = this.mesh.position;
    // this.meshQuaternion = this.mesh.quaternion;

    return this.mesh;
  } 
}