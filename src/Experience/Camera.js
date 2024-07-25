import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Experience from './Experience.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.startPosition = new THREE.Vector3(0, -200, 0);
    this.endPosition = new THREE.Vector3(-50, 5, -30);
    this.introDuration = 5;
    this.oldElapsedTime = 0;
    this.clock = new THREE.Clock();
    this.isInitialMovementDone = false;
    this.world = this.experience.world;

    this.setInstance();
    // this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000);
    // this.instance.position.set(0, -200, 0);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  setTarget(target) {
    this.target = target;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  handleInitialCameraMovement() {
    const elapsedTime = this.clock.getElapsedTime();

    if (elapsedTime < this.introDuration) {
      // Calculate the interpolation factor (between 0 and 1)
      const t = Math.min(elapsedTime / this.introDuration, 1);

      // Interpolate between the start and target positions
      this.instance.position.lerpVectors(this.startPosition, this.endPosition, t);
    } else {
      this.isInitialMovementDone = true;
    }
  }

  updateCameraPositionAndRotation() {
    if (!this.target) return;

    // Get the target's world position and rotation
    const targetPosition = new THREE.Vector3();
    
    const targetQuaternion = new THREE.Quaternion();
    this.target.getWorldPosition(targetPosition);
    this.target.getWorldQuaternion(targetQuaternion);

    // Offset for the camera position relative to the target
    const offset = new THREE.Vector3(-50, 5, -30);
    offset.applyQuaternion(targetQuaternion);
    this.instance.position.copy(targetPosition).add(offset);

    // Set the camera's rotation to match the target's rotation
    this.instance.quaternion.copy(targetQuaternion);
    this.instance.rotateY(-Math.PI / 2);
  }

  update() {
    this.updateCameraPositionAndRotation()
  }
}
