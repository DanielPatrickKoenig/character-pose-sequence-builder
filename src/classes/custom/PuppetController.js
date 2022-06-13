import PlayerController from '../controllers/PlayerController';
export default class PuppetController extends PlayerController{
    constructor(data){
        super(data, 'https://danielpatrickkoenig.github.io/shared-app-resources/slenderBodyUnMirrored.glb', {x: 0, y: 0, z: -10});
    }
}