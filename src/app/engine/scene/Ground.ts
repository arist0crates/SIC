import * as THREE from 'three';

export class Ground{
	static createGround (groundJPG : string) : THREE.Mesh {
		var loader = new THREE.TextureLoader();
		var groundTexture = loader.load( groundJPG );
		groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
		groundTexture.repeat.set( 25, 25 );
		groundTexture.anisotropy = 16;
		var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
		mesh.position.y = 0;//-250
		mesh.rotation.x = - Math.PI / 2;
		mesh.receiveShadow = true;		
		
		return mesh;
	}
}