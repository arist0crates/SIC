import * as THREE from 'three';
import * as OrbitControls from 'orbit-controls-es6';
import { Injectable } from '@angular/core';
import { Renderer } from './scene/Renderer';
import { Camera } from './scene/Camera';
import { Scene } from './scene/Scene';
import { Lights } from './scene/Lights';
import { Ground } from './scene/Ground';
import { Audio } from './scene/Audio';
import { Closet } from './model/Closet';
import { GUI } from './ui/GUI';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  public canvas: HTMLCanvasElement;
  public renderer: THREE.WebGLRenderer;
  public camera: THREE.PerspectiveCamera;
  public cameraControls: OrbitControls;
  public scene: THREE.Scene;
  public ambientLight: THREE.AmbientLight;
  public light: THREE.DirectionalLight;
  public ground: THREE.Mesh;
  public music: THREE.Audio;
  private musicURL = '../../assets/sound/valkyries-rock.mp3';
  //private musicURL = 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast%20-%20Elevator.mp3';

  private closet : Closet;
  
  public GUI : GUI;

  createScene(elementId: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    this.renderer = Renderer.createRenderer(this.canvas);

    //--------Camera. Inclui "cameraControls", mas não são obrigatorios
    this.camera = Camera.createCamera();
    // create the scene
    this.scene = Scene.createScene();
    this.scene.add(this.camera);

    this.cameraControls = Camera.createCameraControls(this.camera,
      this.renderer, this.render);

    this.ambientLight = Lights.createAmbientLight();
    this.scene.add( this.ambientLight );
    this.light = Lights.createDirectionalLight();
    this.scene.add( this.light );

    this.ground = Ground.createGround('../../assets/textures/grasslight-big.jpg');
    this.scene.add( this.ground );
    
    this.music = Audio.createAudio(this.musicURL, this.camera);

    this.closet = new Closet(null, null, null, null, null, null);
    this.scene.add(this.closet.content);

    this.GUI = new GUI(this, this.closet);
  }

  animate(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.render();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }
}
