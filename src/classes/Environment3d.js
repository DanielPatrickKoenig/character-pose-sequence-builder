import * as THREE from 'three';
import { Object3D } from 'three';
import {ShapeTypes} from '../utils/Utilities.js';
import {getRaycastIntersections, object3DSelector, createPrimitive} from '../utils/THREEHelpers.js';
import Physics from '../classes/Physics.js';
import { POVModes } from './POVManager.js';
export default class Environment3d{
    constructor(element, { width, height, background, gravity, pov }){
        const _width = width ? width : 1000;
        const _height = height ? height :  700;
        this.element = element;
        console.log(pov);
        this.povMode = pov ? pov : POVModes.SIDE_SCROLL_FLAT;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( background | 0xFFFFFF );
        this.cameraContainer = new Object3D();
        this.camera = this.createCamera(_width, _height);
        this.cameraContainer.add(this.camera);
        this.scene.add(this.cameraContainer);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( _width, _height );
        this.controllers = [];
        element.appendChild(this.renderer.domElement);
        this.physics = null;
        // console.log(this.cameraContainer);
        if(gravity){
            this.physics = new Physics({ gravity, clock: new THREE.Clock() });   
            setTimeout(() => {
                this.physics.update();
            },10);
        }
        
    }
    createCamera(width, height) {
        let camera;
        switch(this.povMode){
            case POVModes.THIRD_PERSON:
            case POVModes.FIRST_PERSON:
            case POVModes.SIDE_SCROLL_PERSPECTIVE:
            case POVModes.ISOPERSPECTIVE:{
                camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
                break;
            }
            case POVModes.SIDE_SCROLL_FLAT:{
                const aspect = width / height;
                const d = 20;
                camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
                // camera.position.set( 20, 20, 20 );
                break;
            }
            case POVModes.ISOMETRIC:{
                const aspect = width / height;
                const d = 20;
                camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 0, 1000 );
                camera.position.set( 0, 0, 0 );
                break;
            }
        }
        
        return camera;
    }
    registerController (controller) {
        this.controllers.push({ controller, type: controller.getControllerType(), id: controller.controllerID });
    }
    unregisterController (controller) {
        const id = controller.controllerID;
        const targetController = this.controllers.map((item, index) => ({index, item})).filter(item => item.item.id === id)[0];
        if(targetController){
            this.controllers.splice(targetController.index, 1);
        }
    }
    render(){
        this.renderer.render(this.scene, this.camera);
    }
    rayCastHits({x, y}, objects){
        return getRaycastIntersections({x, y}, objects, this.camera, this.renderer);
    }
    selector(scope, filters) {
        return object3DSelector(scope, filters);
    }
    createPlane({size, orientation, position, mass, material, rotation}){
        const physics = mass !== undefined ? this.physics : null;
        return createPrimitive({ type: ShapeTypes.PLANE, size, position, orientation, mass, physics, material, rotation, scene: this.scene });
    }
    createBox({size, orientation, position, mass, material, rotation}){
        const physics = mass !== undefined ? this.physics : null;
        return createPrimitive({ type: ShapeTypes.BOX, size, position, orientation, mass, physics, material, rotation, scene: this.scene });
    }
    createSphere({size, orientation, position, mass, material, rotation}){
        const physics = mass !== undefined ? this.physics : null;
        return createPrimitive({ type: ShapeTypes.SPHERE, size, position, orientation, mass, physics, material, rotation, scene: this.scene });
    }
    createCylinder({size, orientation, position, mass, material, rotation}){
        const physics = mass !== undefined ? this.physics : null;
        return createPrimitive({ type: ShapeTypes.CYLINDER, size, position, orientation, mass, physics, material, rotation, scene: this.scene });
    }
}