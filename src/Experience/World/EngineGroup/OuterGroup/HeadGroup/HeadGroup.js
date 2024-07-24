import * as THREE from "three";
import Experience from "../../../../Experience";
import HeadShell from "./HeadShell";
import HeadCircle from "./HeadCircle";

export default class HeadGroup {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.setInstance();
    this.setHeadShell();
    this.setHeadCircle();
    this.getInstance();
  }

  setInstance() {
    this.instance = new THREE.Group();
    this.instance.position.x = -5.64
    this.instance.position.x = -5.64;
    this.instance.position.y = -14.0;
    this.instance.rotation.y = 0;
    this.instance.rotation.z = -1.8;
  }

  setHeadShell() {
    this.headShell = new HeadShell();
    this.instance.add(this.headShell.getMesh());
  }

  setHeadCircle() {
    this.headCircle = new HeadCircle();
    this.instance.add(this.headCircle.getMesh());
  }

  getInstance() {
    return this.instance;
  }
}