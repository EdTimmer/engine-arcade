import * as THREE from 'three'
import Experience from '../../Experience'

export default class ObstacleSphereFarTop {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.physics = this.experience.physics;
    this.elapsedTime = this.experience.elapsedTime;
    this.showWireframe = true;

    this.setMaterial()
    this.setGeometry()
    this.setMesh()
    this.setPhysics()
    this.update()
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ 
      color: '#F000FF', 
      wireframe: this.showWireframe, 
      transparent: true, 
      opacity: this.showWireframe ? 1 : 0,
    });
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(36, 8, 8);
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(780, 0, 0);

    this.meshPosition = this.mesh.position;
    this.meshQuaternion = this.mesh.quaternion;
    this.scene.add(this.mesh);
  } 

  setPhysics() {
    this.physics.setObstacleSphereFarTopBody(this.meshPosition, this.meshQuaternion)
  }

  setWireframe(value) {
    this.material.wireframe = value;
    this.material.opacity = value ? 1 : 0;
  }

  update() {    
    this.mesh.position.x = 780 * Math.cos(this.experience.time.getElapsedTime() * 0.0005);
    this.mesh.position.y = 120; // Keep it on the horizontal plane
    this.mesh.position.z = 780 * Math.sin(-this.experience.time.getElapsedTime() * 0.0005);
    // this.mesh.rotation.y = -this.experience.time.getElapsedTime() * 0.1;
    // this.mesh.rotation.z += 0.01
    // this.mesh.rotation.x += 0.01
    this.physics.obstacleSphereFarTopBody.position.copy(this.mesh.position);
  }
}