import * as THREE from 'three';
import { ObjectController } from '../ObjectController';
import { EngineService } from '../engine.service';
import { Drawer } from './Drawer';
import { Shelf } from './Shelf';
import { Wall } from './Wall';

export function Closet(width, height, depth, inputColor, position, Children){
    // closet
    //Dimension
    var multi = 10;
    var widthM = width * multi;
    var heightM = height * multi;
    var depthM = depth * multi;
    var closet = new THREE.Group();
    var loader = new THREE.TextureLoader();
    var woodTexture = loader.load( '../../../assets/textures/madeira.jpeg' );
    var thickness = 15;
    var aux = (heightM-500)*0.5;
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.repeat.set( 3, 1 );
    woodTexture.anisotropy = 16;

    var closetBack = new THREE.BoxBufferGeometry( widthM + thickness*2, heightM + thickness*2, thickness);
    var closetBackMat = new THREE.MeshLambertMaterial({ map: woodTexture });
    var mesh = new THREE.Mesh( closetBack, closetBackMat );
    mesh.position.x = 0;
    mesh.position.y = thickness + heightM/2;
    mesh.position.z = - (depthM/2) - (thickness/2);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetRightSide = new THREE.BoxBufferGeometry( thickness, heightM + thickness*2, depthM);
    var closetRightSideMat = new THREE.MeshLambertMaterial({ map: woodTexture });
    var mesh = new THREE.Mesh( closetRightSide, closetRightSideMat );
    mesh.position.x =  (widthM/2) + (thickness/2);
    mesh.position.y = thickness + heightM/2;
    mesh.position.z = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetLeftSide = new THREE.BoxBufferGeometry( thickness, heightM + thickness*2, depthM);
    var closetLeftSideMat = new THREE.MeshLambertMaterial({ map: woodTexture });
    var mesh = new THREE.Mesh( closetLeftSide, closetLeftSideMat );
    mesh.position.x = - (widthM/2) - (thickness/2);
    mesh.position.y = thickness + heightM/2;
    mesh.position.z = 0
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );*/
    var closetBottom = new THREE.BoxBufferGeometry( widthM, thickness, depthM);
    var closetBottomMat = new THREE.MeshLambertMaterial({ map: woodTexture });
    var mesh = new THREE.Mesh( closetBottom, closetBottomMat );
    mesh.position.x = 0;
    mesh.position.y = thickness/2;
    mesh.position.z = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetTop = new THREE.BoxBufferGeometry( widthM, thickness, depthM);
    var closetTopMat = new THREE.MeshLambertMaterial({ map: woodTexture});
    var mesh = new THREE.Mesh( closetTop, closetTopMat );
    mesh.position.x = 0;
    mesh.position.y = thickness/2 + thickness + heightM;
    mesh.position.z = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);

    this.content = closet;
}



/*export function Closet(height, width, depth, inputColor, position, Children){
    // closet
    var closet = new THREE.Group();
    var loader = new THREE.TextureLoader();
    var woodTexture = loader.load( '../../../assets/textures/madeira.jpeg' );
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.repeat.set( 3, 1 );
    woodTexture.anisotropy = 16;

    var closetBack = new THREE.BoxBufferGeometry( 300, 375, 15);
    var closetBackMat = new THREE.MeshLambertMaterial({ map: woodTexture });
    var mesh = new THREE.Mesh( closetBack, closetBackMat );
    mesh.position.x = - 125;
    mesh.position.y = - 62;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetRightSide = new THREE.BoxBufferGeometry( 15, 375, 200);
    var closetRightSideMat = new THREE.MeshLambertMaterial({ map: woodTexture });
    var mesh = new THREE.Mesh( closetRightSide, closetRightSideMat );
    mesh.position.x = 25;
    mesh.position.y = - 62;
    mesh.position.z = 100;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetLeftSide = new THREE.BoxBufferGeometry( 15, 375, 200);
    var closetLeftSideMat = new THREE.MeshLambertMaterial({ map: woodTexture });
    var mesh = new THREE.Mesh( closetLeftSide, closetLeftSideMat );
    mesh.position.x = -275;
    mesh.position.y = - 62;
    mesh.position.z = 100;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetBottom = new THREE.BoxBufferGeometry( 305, 15, 200);
    var closetBottomMat = new THREE.MeshLambertMaterial({ map: woodTexture });
    var mesh = new THREE.Mesh( closetBottom, closetBottomMat );
    mesh.position.x = - 125;
    mesh.position.y = -245;
    mesh.position.z = 100;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);
    //scene.add( mesh );
    var closetTop = new THREE.BoxBufferGeometry( 305, 15, 200);
    var closetTopMat = new THREE.MeshLambertMaterial({ map: woodTexture});
    var mesh = new THREE.Mesh( closetTop, closetTopMat );
    mesh.position.x = - 125;
    mesh.position.y = 124;
    mesh.position.z = 100;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    closet.add(mesh);

    this.content = closet;

    //------Arrays/stacks de gavetas, prateleiras e paredes. Sem isto, não dá para adicionar/remover de forma ordeira
    this.drawerList = [];
    this.shelfList = [];
    this.wallList = [];

    this.replaceTexture = function(newTexture){
        for (i = 0; i < closet.children.length; i++) {
            if (closet.children[i] instanceof THREE.Mesh){
                var mesh = closet.children[i];
                mesh.material.map = THREE.ImageUtils.loadTexture( newTexture );
                mesh.material.needsUpdate = true;
            }
        }

        //-------Replace textures for all Drawers
        for (i = 0; i < this.drawerList.length; i++) {
            this.drawerList[i].replaceTexture(newTexture);
        }

        //-------Replace textures for all Shelves
        for (i = 0; i < this.shelfList.length; i++) {
            this.shelfList[i].replaceTexture(newTexture);
        }

        //-------Replace textures for all Walls
        for (i = 0; i < this.wallList.length; i++) {
            this.wallList[i].replaceTexture(newTexture);
        }
    }

    this.toggleControls = function(){
        for(i=0; i < this.drawerList.length; i++){
            var Drawer = this.drawerList[i];
            Drawer.toggleControls();
        }
        for(i=0; i < this.shelfList.length; i++){
            var Shelf = this.shelfList[i];
            Shelf.toggleControls();
        }
        for(i=0; i < this.wallList.length; i++){
            var Wall = this.wallList[i];
            Wall.toggleControls();
        }
    }

    this.empty = function(){
        this.drawerList = [];
        this.shelfList = [];
        this.wallList = [];
    }
}*/

/*export class Closet{
    //------Arrays/stacks de gavetas, prateleiras e paredes. Sem isto, não dá para adicionar/remover de forma ordeira
    drawerList;
    shelfList;
    wallList;

    content;
    
    constructor(height, width, depth, inputColor, position, Children){
        this.drawerList = [];
        this.shelfList = [];
        this.wallList = [];

        this.drawerList.splice(0, this.drawerList.length);
        this.shelfList.splice(0, this.shelfList.length);
        this.wallList.splice(0, this.wallList.length);

        // closet
        var closet = new THREE.Group();
        var loader = new THREE.TextureLoader();
        var woodTexture = loader.load( './textures/madeira.jpeg' );
        woodTexture.wrapS = THREE.RepeatWrapping;
        woodTexture.repeat.set( 3, 1 );
        woodTexture.anisotropy = 16;

        var closetBack = new THREE.BoxBufferGeometry( 300, 375, 15);
        var closetBackMat = new THREE.MeshLambertMaterial({ map: woodTexture });
        var mesh = new THREE.Mesh( closetBack, closetBackMat );
        mesh.position.x = - 125;
        mesh.position.y = - 62;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        closet.add(mesh);
        //scene.add( mesh );
        var closetRightSide = new THREE.BoxBufferGeometry( 15, 375, 200);
        var closetRightSideMat = new THREE.MeshLambertMaterial({ map: woodTexture });
        var mesh = new THREE.Mesh( closetRightSide, closetRightSideMat );
        mesh.position.x = 25;
        mesh.position.y = - 62;
        mesh.position.z = 100;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        closet.add(mesh);
        //scene.add( mesh );
        var closetLeftSide = new THREE.BoxBufferGeometry( 15, 375, 200);
        var closetLeftSideMat = new THREE.MeshLambertMaterial({ map: woodTexture });
        var mesh = new THREE.Mesh( closetLeftSide, closetLeftSideMat );
        mesh.position.x = -275;
        mesh.position.y = - 62;
        mesh.position.z = 100;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        closet.add(mesh);
        //scene.add( mesh );
        var closetBottom = new THREE.BoxBufferGeometry( 305, 15, 200);
        var closetBottomMat = new THREE.MeshLambertMaterial({ map: woodTexture });
        var mesh = new THREE.Mesh( closetBottom, closetBottomMat );
        mesh.position.x = - 125;
        mesh.position.y = -245;
        mesh.position.z = 100;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        closet.add(mesh);
        //scene.add( mesh );
        var closetTop = new THREE.BoxBufferGeometry( 305, 15, 200);
        var closetTopMat = new THREE.MeshLambertMaterial({ map: woodTexture});
        var mesh = new THREE.Mesh( closetTop, closetTopMat );
        mesh.position.x = - 125;
        mesh.position.y = 124;
        mesh.position.z = 100;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        closet.add(mesh);

        this.content = closet;
    }

    replaceTexture(newTexture){
        for (var i = 0; i < this.content.children.length; i++) {
            if (this.content.children[i] instanceof THREE.Mesh){
                var mesh = this.content.children[i];
                mesh.material.map = THREE.ImageUtils.loadTexture( newTexture );
                mesh.material.needsUpdate = true;
            }
        }

        //-------Replace textures for all Drawers
        for (i = 0; i < this.drawerList.length; i++) {
            this.drawerList[i].replaceTexture(newTexture);
        }

        //-------Replace textures for all Shelves
        for (i = 0; i < this.shelfList.length; i++) {
            this.shelfList[i].replaceTexture(newTexture);
        }

        //-------Replace textures for all Walls
        for (i = 0; i < this.wallList.length; i++) {
            this.wallList[i].replaceTexture(newTexture);
        }
    }

    toggleControls (){
        for(var i=0; i < this.drawerList.length; i++){
            var Drawer = this.drawerList[i];
            Drawer.toggleControls();
        }
        for(i=0; i < this.shelfList.length; i++){
            var Shelf = this.shelfList[i];
            Shelf.toggleControls();
        }
        for(i=0; i < this.wallList.length; i++){
            var Wall = this.wallList[i];
            Wall.toggleControls();
        }
    }

    empty(){
        this.drawerList.splice(0, this.drawerList.length);
        this.shelfList.splice(0, this.shelfList.length);
        this.wallList.splice(0, this.wallList.length);
    }
}*/