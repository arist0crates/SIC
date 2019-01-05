import * as THREE from 'three';
import { ObjectController } from '../ObjectController';
import { EngineService } from '../engine.service';
import { Drawer } from './Drawer';
import { Shelf } from './Shelf';
import { Wall } from './Wall';

export function Closet(width, height, depth, textureN){
    // closet
    var closet = new THREE.Group();
    var loader = new THREE.TextureLoader();
    console.log(textureN);
    //Texture
    var texture = loader.load( '../../../assets/textures/madeira.jpeg' );
    if(textureN == "Madeira Polida"){
        texture = loader.load( '../../../assets/textures/madeiraPolida.jpg' );
    }else if(textureN == "Metal Escovado"){
        texture = loader.load( '../../../assets/textures/metal.jpg' );
    }else if(textureN == "Plastico Picado"){
        texture = loader.load( '../../../assets/textures/plastico.jpg' );
    }

    var thickness = 15;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set( 3, 1 );
    texture.anisotropy = 16;

    var closetBack = new THREE.BoxBufferGeometry( width + thickness*2, height + thickness*2, thickness);
    var closetBackMat = new THREE.MeshLambertMaterial({ map: texture });
    var mesh = new THREE.Mesh( closetBack, closetBackMat );
    mesh.position.x = 0;
    mesh.position.y = thickness + height/2;
    mesh.position.z = - (depth/2) - (thickness/2);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetRightSide = new THREE.BoxBufferGeometry( thickness, height + thickness*2, depth);
    var closetRightSideMat = new THREE.MeshLambertMaterial({ map: texture });
    var mesh = new THREE.Mesh( closetRightSide, closetRightSideMat );
    mesh.position.x =  (width/2) + (thickness/2);
    mesh.position.y = thickness + height/2;
    mesh.position.z = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetLeftSide = new THREE.BoxBufferGeometry( thickness, height + thickness*2, depth);
    var closetLeftSideMat = new THREE.MeshLambertMaterial({ map: texture });
    var mesh = new THREE.Mesh( closetLeftSide, closetLeftSideMat );
    mesh.position.x = - (width/2) - (thickness/2);
    mesh.position.y = thickness + height/2;
    mesh.position.z = 0
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );*/
    var closetBottom = new THREE.BoxBufferGeometry( width, thickness, depth);
    var closetBottomMat = new THREE.MeshLambertMaterial({ map: texture });
    var mesh = new THREE.Mesh( closetBottom, closetBottomMat );
    mesh.position.x = 0;
    mesh.position.y = thickness/2;
    mesh.position.z = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetTop = new THREE.BoxBufferGeometry( width, thickness, depth);
    var closetTopMat = new THREE.MeshLambertMaterial({ map: texture});
    var mesh = new THREE.Mesh( closetTop, closetTopMat );
    mesh.position.x = 0;
    mesh.position.y = thickness/2 + thickness + height;
    mesh.position.z = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);

    this.content = closet;
}