import * as THREE from "three";
import Experience from "../../Experience";
import GateFrame from "./GateFrame";
import GateSurface from "./GateSurface";

export default class GateGroup {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setInstance();    
    this.setGateFrame();
    this.setGateSurface();
    this.positionGateGroup();
    this.addGateGroup();
  }

  setInstance() {
    this.instance = new THREE.Group();
  }

  setGateFrame() {
    this.gateFrame = new GateFrame();
    this.instance.add(this.gateFrame.getMesh());
  }

  setGateSurface() {
    this.gateSurface = new GateSurface();
    this.instance.add(this.gateSurface.getMesh());
  }

  positionGateGroup() {
    this.instance.position.x = 350;
    this.instance.rotateY(Math.PI / 2);
  }

  addGateGroup() {
    this.scene.add(this.instance);
  }
}