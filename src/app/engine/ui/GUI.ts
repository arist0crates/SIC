import * as THREE from 'three';
import * as OrbitControls from 'orbit-controls-es6';
import { EngineService } from "../engine.service";
import { Closet } from '../model/Closet';
import * as dat from 'dat.gui';
import { Shelf } from '../model/Shelf';
import { Wall } from '../model/Wall';
import { Drawer } from '../model/Drawer';
import { CrossheadStand } from '../model/CrossheadStand';
import { Renderer } from '../scene/Renderer';
import { Camera } from '../scene/Camera';
import { Scene } from '../scene/Scene';
import { Lights } from '../scene/Lights';
import { Ground } from '../scene/Ground';
import { Audio } from '../scene/Audio';
import { Exporter } from '../loadExport/Exporter';
import { Importer } from '../loadExport/Importer';

export class GUI{
	constructor (World : EngineService, Closet : Closet){
		var gui = new dat.GUI();

		var lightingFolder = gui.addFolder('Lights & Shadows');
		lightingFolder.add(World.light, 'visible').name('Directional Light').listen();
		lightingFolder.add(World.ambientLight, 'visible').name('Ambient Light').listen();
		lightingFolder.add(World.light, 'castShadow').name('Shadows').listen();
		lightingFolder.add(World.light, 'intensity', 1, 50).name('Directional Light Intensity').listen();
		lightingFolder.add(World.ambientLight, 'intensity', 1, 50).name('Ambient Light Intensity').listen();
		
		lightingFolder.add(World.light.position, 'x', -275, 275).name('Pos. Light X').listen();
		lightingFolder.add(World.light.position, 'y', -275, 275).name('Pos. Light Y').listen();
		lightingFolder.add(World.light.position, 'z', -275, 275).name('Pos. Light Z').listen();

		var objectControlsFolder = gui.addFolder('Object Controls');
		var controlsUI = {
			Toggle: function () {
				Closet.toggleControls();
				console.log("Controls toggled.") 
			}
		};
		objectControlsFolder.add(controlsUI, 'Toggle');

		//-------Closet Dimensions
		var closet = Closet.content;
		var size = gui.addFolder('Closet Size');

		size.add(closet.scale, 'x', 1, 4).name('Closet Width').listen();

		size.add(closet.scale, 'z', 1, 4).name('Closet Depth').listen();
		
						
		//------Materiais - madeira, mahogany
		var material = gui.addFolder('Material');

		var madeira1UI = { Madeira1:function(){ 
			Closet.replaceTexture('../../../assets/textures/madeira.jpeg');	
			console.log("Madeira1 selected.") 
		}};
		material.add(madeira1UI, 'Madeira1');

		var madeira2UI = { Madeira2:function(){ 
			Closet.replaceTexture('../../../assets/textures/madeira.jpg');	
			console.log("Madeira2 selected.") 
		}};
		material.add(madeira2UI, 'Madeira2');

		var mahoganyUI = { Mahogany:function(){ 
			Closet.replaceTexture('../../../assets/textures/mahogany.jpg');	
			console.log("Mahogany selected.") 
		}};
		material.add(mahoganyUI, 'Mahogany');

		var mahoganyCinzaUI = { MahoganyGrey:function(){ 
			Closet.replaceTexture('../../../assets/textures/mahogany-cinza.jpg');	
			console.log("Mahogany grey selected.") 
		}};
		material.add(mahoganyCinzaUI, 'MahoganyGrey');

		var pineDarkUI = { PineDark:function(){ 
			Closet.replaceTexture('../../../assets/textures/pine-dark-brown.jpg');	
			console.log("Mahogany grey selected.") 
		}};
		material.add(pineDarkUI, 'PineDark');

		var pineLightUI = { PineLight:function(){ 
			Closet.replaceTexture('../../../assets/textures/pine-light-brown.jpg');	
			console.log("Pine Light selected.") 
		}};
		material.add(pineLightUI, 'PineLight');

		//-----------------Finish Folder
		var finish = gui.addFolder('Finish');

		var madeiraPolidaUI = {
			MadeiraPolida: function () {
				Closet.replaceTexture('../../../assets/textures/madeira1Polida.jpg');
				console.log("Madeira Polida selected.")
			}
		};
		finish.add(madeiraPolidaUI, 'MadeiraPolida');

		
		var envernizadoUI = {
			Envernizado: function () {
				Closet.replaceTexture('../../../assets/textures/envernizado.jpg');
				console.log("Envernizado selected.")
			}
		};
		finish.add(envernizadoUI, 'Envernizado');


		var brilhanteUI = {
			Brilhante: function () {
				Closet.replaceTexture('../../../assets/textures/brilhante.jpg');
				console.log("Brilhante selected.")
			}
		};
		finish.add(brilhanteUI, 'Brilhante');

		//---------------Music Folder
		var soundFolder = gui.addFolder('Music');
		
		var soundUI = {
			Pause: function () {
				World.music.pause();
			}
			,
			Play: function () {
				World.music.play();
			}
			,
			Stop: function () {
				World.music.stop();
			}
		};
		soundFolder.add(soundUI,'Pause');
		soundFolder.add(soundUI,'Play');
		soundFolder.add(soundUI,'Stop');

		//----------Add Products
		var scene = World.scene;

		var addProducts = gui.addFolder('Add Product');

		//---------Shelves
		var shelfList = Closet.shelfList;
		var shelves = addProducts.addFolder('Shelves');
		var shelfUI = {
			add: function () {
				var shelf = new Shelf(World);
				shelfList.push(shelf);
				scene.add(shelfList[shelfList.length - 1].content);
				console.log("Shelf created")
			}
			,
			remove: function () {
				var shelf = shelfList.pop();
				scene.remove(shelf.controller.control);
				scene.remove(shelf.content);
				console.log("Shelf removed")
			}
		};
		shelves.add(shelfUI, 'add');
		shelves.add(shelfUI, 'remove');


		//---------Walls
		var wallList = Closet.wallList;
		var wallsFolder = addProducts.addFolder('Walls');
		var wallUI = {
			add: function () {
				var wall = new Wall(World);
				wallList.push(wall);
				scene.add(wallList[wallList.length - 1].content);
				console.log("Wall created")
			}
			,
			remove: function () {
				var wall = wallList.pop();
				scene.remove(wall.controller.control);
				scene.remove(wall.content);
				console.log("Wall removed")
			}
		};
		wallsFolder.add(wallUI, 'add');
		wallsFolder.add(wallUI, 'remove');


		//---------Drawers
		var drawerList = Closet.drawerList;
		var drawers = addProducts.addFolder('Drawers');
		var drawerUI = {
			add: function () {
				var drawer = new Drawer(World,null,null,null,null,null);
				drawerList.push(drawer);
				scene.add(drawerList[drawerList.length - 1].content);
				console.log("Drawer created")
			}
			,
			remove: function () {
				var drawer = drawerList.pop();
				scene.remove(drawer.controller.control);
				scene.remove(drawer.content);
				console.log("Drawer removed")
			}
		};
		drawers.add(drawerUI, 'add');
		drawers.add(drawerUI, 'remove');


		//---------Crosshead
		var crossheadstand;
		var crossheads = addProducts.addFolder('Crossheads');
		var crossheadsUI = {
			add: function () {
				crossheadstand = new CrossheadStand(World);
				scene.add(crossheadstand.content);
				console.log("Crosshead Stand created")
			}
			,
			remove: function () {
				scene.remove(crossheadstand.controller.control);
				scene.remove(crossheadstand.content);
				console.log("Crosshead Stand removed")
			}
		};
		crossheads.add(crossheadsUI, 'add');
		crossheads.add(crossheadsUI, 'remove');



		//----------------SAVE / LOAD folder
		var saveLoadFolder = gui.addFolder('Import & Export');
		var saveLoadUI = {
			ImportFromJSON: function () {
				scene = Importer.importJSON('./scene.json');
				console.log("Scene imported from JSON file")
			}
			,
			ExportToJSON: function () {
				Exporter.exportToJSON(scene);
				console.log("Scene exported to JSON file")
			}
			,
			ImportFromGLTF: function () {
				clearScene(scene);
				Importer.importGLTF('./scene.gltf', scene);
				console.log("Scene exported to GLTF file")
			}
			,
			ExportToGLTF: function () {
				Exporter.exportToGLTF(scene);
				console.log("Scene exported to GLTF file")
			}
			,
			ResetScene: function () {
				resetScene(World);
				console.log("Scene reset")
			}
		};
		saveLoadFolder.add(saveLoadUI, 'ImportFromJSON');
		saveLoadFolder.add(saveLoadUI, 'ExportToJSON');
		saveLoadFolder.add(saveLoadUI, 'ImportFromGLTF');
		saveLoadFolder.add(saveLoadUI, 'ExportToGLTF');
		saveLoadFolder.add(saveLoadUI, 'ResetScene');
	}
}

function clearScene(obj){
	while(obj.children.length > 0){ 
		clearScene(obj.children[0])
		obj.remove(obj.children[0]);
	}
	if(obj.geometry) obj.geometry.dispose()
	if(obj.material) obj.material.dispose()
	if(obj.texture) obj.texture.dispose()
}

function resetScene(World){
	var renderer = World.renderer;
	var scene = World.scene;
	var camera = World.camera;
	var cameraControls = World.cameraControls;
	var light = World.light;
	var ambientLight = World.ambientLight;
	var music = World.music;

	clearScene(scene);
	renderer = new Renderer();

	//--------Camera. Inclui "cameraControls", mas não são obrigatorios
	camera = new Camera();

	cameraControls = new OrbitControls(camera, renderer.domElement);
	cameraControls.update();
    cameraControls.addEventListener('change', World.render);

	//Definir scene e cor de fundo
	scene = new Scene();
	ambientLight = Lights.createAmbientLight();
	scene.add( ambientLight );
	light = Lights.createDirectionalLight();
	scene.add( light );

	var ground = Ground.createGround('../../../assets/textures/grasslight-big.jpg');
	scene.add( ground );

	music = Audio.createAudio('../../../assets/sound/valkyries.mp3', camera);

	var ClosetObj = new Closet(null, null, null, null, null, null);
	scene.add(ClosetObj.content);
}