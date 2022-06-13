import BaseScene from '../BaseScene';
import PuppetController from './PuppetController';
import LightController, {LightTypes} from '../controllers/LightController';
export default class GameScene extends BaseScene{
    constructor(el){
        super(el);
    }
    initialize(){
        const lightController = new LightController({environment: this.environment});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: 1.5, target: {x: 20, y: 0, z: 15}});
        lightController.addLight({type: LightTypes.DIRECTIONAL, color: 0xffffff, intensity: .5, target: {x: -5, y: 0, z: -22}});

        new PuppetController({environment: this.environment});
    }
}