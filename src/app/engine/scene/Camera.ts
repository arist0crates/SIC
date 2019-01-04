import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

export class Camera{
    static createCamera() : THREE.PerspectiveCamera {
        var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set( 1000, 50, 3000 );
        return camera;
    }
    
    static createCameraControls(camera : THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer, render) : OrbitControls{
        var cameraControls = new OrbitControls(camera, renderer.domElement);
        cameraControls.update();
        cameraControls.addEventListener('change', render);
        return cameraControls;
    }
}

	