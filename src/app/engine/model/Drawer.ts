import * as THREE from 'three';
import { ObjectController } from '../ObjectController';
import { EngineService } from '../engine.service';

export class Drawer{
    public content : THREE.Group;
    public controller : ObjectController;

    private mesh;

    constructor(World : EngineService,width,height,depth,pos,textureN){

        //Default Value
        if(width == null){
            width = 300;
        }
        if(height == null){
            height = 100;
        }
        if(depth == null){
            depth = 200;
        }
        if(pos == null){
            pos = 50;
        }
        
        var drawer = new THREE.Group();
        var loader = new THREE.TextureLoader();
        var texture = loader.load( '../../../assets/textures/madeira.jpeg' );
        if(textureN == "Madeira Polida"){
            texture = loader.load( '../../../assets/textures/madeiraPolida.jpg' );
        }else if(textureN == "Metal Escovado"){
            texture = loader.load( '../../../assets/textures/metal.jpg' );
        }else if(textureN == "Plastico Picado"){
            texture = loader.load( '../../../assets/textures/plastico.jpg' );
        }

        
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set( 3, 1 );
        texture.anisotropy = 16;

        var drawerModel = new THREE.BoxBufferGeometry( width, height, depth);
        var drawerMat = new THREE.MeshLambertMaterial({ map: texture });
        this.mesh = new THREE.Mesh( drawerModel, drawerMat );
        this.mesh.position.x = 0;
        this.mesh.position.y = pos;
        this.mesh.position.z = 0;
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        drawer.add(this.mesh);

        var handleModel = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        var handelMat = new THREE.MeshBasicMaterial( {color: 0x505050} );
        var cylinder = new THREE.Mesh( handleModel, handelMat );	
        cylinder.position.x = 0;
        cylinder.position.y = pos;
        cylinder.position.z = depth/2;
        cylinder.rotateZ(1.57);
        cylinder.receiveShadow = true;
        cylinder.castShadow = true;
        drawer.add(cylinder);
        
        /*this.controller = new ObjectController (drawer, World.camera,
            World.cameraControls, World.renderer, World.render);
        
        World.scene.add(this.controller.control);*/

        this.content = drawer;
    }

    replaceTexture(newTexture){
        this.mesh.material.map = THREE.ImageUtils.loadTexture( newTexture );
        this.mesh.material.needsUpdate = true;
    }

    toggleControls(){
        this.controller.control.enabled = !this.controller.control.enabled;
        this.controller.control.visible = !this.controller.control.visible;
    }
}