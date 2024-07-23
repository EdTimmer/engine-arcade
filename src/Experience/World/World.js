import Experience from "../Experience"
import Environment from "./Environment"
import EngineGroup from "./EngineGroup/EngineGroup"
import Target from "./Target"
import Wall from "./ArenaGroup/Wall"
import Ceiling from "./ArenaGroup/Ceiling"
import Floor from "./ArenaGroup/Floor"
import Obstacle from "./ArenaGroup/Obstacle"
import ObstacleSphereTop from "./ArenaGroup/ObstacleSphereTop"
import ObstacleSphereBottom from "./ArenaGroup/ObstacleSphereBottom"
import ObstacleSphereCenter from "./ArenaGroup/ObstacleSphereCenter"
import ObstacleSphereFarTop from "./ArenaGroup/ObstacleSphereFarTop"
import ObstacleSphereFarBottom from "./ArenaGroup/ObstacleSphereFarBottom"
import ObstacleSphereFarCenter from "./ArenaGroup/ObstacleSphereFarCenter"
// import GateGroup from "./GateGroup/GateGroup"
// import GateFrame from "./GateGroup/GateFrame"
// import GateSurface from "./GateGroup/GateSurface"

import ModalController from "../ModalController"

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.targetPositions = [
      { x: 80, y: 0, z: 0 },
      { x: 90, y: 0, z: -10 },
      { x: 90, y: 0, z: 10 },
      { x: 100, y: 0, z: -20 },
      { x: 100, y: 0, z: 0 },
      { x: 100, y: 0, z: 20 },
    ]
    this.targetMeshes = []
    this.showWireframe = false

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('world')
      this.debugFolder.add(this, 'showWireframe').name('Show Wireframe').onChange(this.updateWireframe.bind(this))
    }

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.engineGroup = new EngineGroup()
      this.makeTargets()
      this.wall = new Wall();
      this.ceiling = new Ceiling();
      this.floor = new Floor();
      // this.obstacle = new Obstacle();
      this.obstacleSphereTop = new ObstacleSphereTop();
      this.obstacleSphereBottom = new ObstacleSphereBottom();
      this.obstacleSphereCenter = new ObstacleSphereCenter();
      this.obstacleSphereFarTop = new ObstacleSphereFarTop();
      this.obstacleSphereFarBottom = new ObstacleSphereFarBottom();
      this.obstacleSphereFarCenter = new ObstacleSphereFarCenter();
      // this.obstacleTorusLarge = new GateFrame();
      // this.gateSurface = new GateSurface();
      // this.gateGroup = new GateGroup();
      this.modalController = new ModalController('modal')
      this.environment = new Environment()
           
      // Pass engineGroup to the camera
      this.camera.setTarget(this.engineGroup.instance)
    })
  }

  makeTargets() {
    this.targetPositions.forEach((position) => {
      const target = new Target(position)
      this.targetMeshes.push(target.mesh)
      this.scene.add(target.mesh)
    })
  }

  updateWireframe(value) {
    // Update the wireframe property for all relevant objects
    if (this.wall) this.wall.setWireframe(value)
    if (this.ceiling) this.ceiling.setWireframe(value)
    if (this.floor) this.floor.setWireframe(value)
    if (this.obstacleSphereTop) this.obstacleSphereTop.setWireframe(value)
    if (this.obstacleSphereBottom) this.obstacleSphereBottom.setWireframe(value)
    if (this.obstacleSphereCenter) this.obstacleSphereCenter.setWireframe(value)
    if (this.obstacleSphereFarBottom) this.obstacleSphereFarBottom.setWireframe(value)
    if (this.obstacleSphereFarTop) this.obstacleSphereFarTop.setWireframe(value)
    if (this.obstacleSphereFarCenter) this.obstacleSphereFarCenter.setWireframe(value)
    // if (this.obstacleTorusLarge) this.obstacleTorusLarge.setWireframe(value)
    // if (this.gateSurface) this.gateSurface.setWireframe(value)
    // if (this.obstacle) this.obstacle.setWireframe(value)
  }

  update() {
    if (this.camera) {
      this.camera.update()
    }
    if (this.engineGroup) {
      this.engineGroup.update()
    }
    if (this.target) {
      this.target.update()
    }
    // if (this.obstacle) {
    //   this.obstacle.update()
    // }
    if (this.obstacleSphereTop) {
      this.obstacleSphereTop.update()
    }
    if (this.obstacleSphereBottom) {
      this.obstacleSphereBottom.update()
    }
    if (this.obstacleSphereCenter) {
      this.obstacleSphereCenter.update()
    }
    if (this.obstacleSphereFarBottom) {
      this.obstacleSphereFarBottom.update()
    }
    if (this.obstacleSphereFarTop) {
      this.obstacleSphereFarTop.update()
    }
    if (this.obstacleSphereFarCenter) {
      this.obstacleSphereFarCenter.update()
    }
    // if (this.obstacleTorusLarge) {
    //   this.obstacleTorusLarge.update()
    // }
    // if (this.gateSurface) {
    //   this.gateSurface.update()
    // }
  }
}