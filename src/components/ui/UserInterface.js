import { useState } from 'react';
import {object3DSelector} from '../../utils/THREEHelpers';
import BoneList from './BoneList'; 
const UserInterface = ({scene}) => {
    
    const [bones, setBones] = useState([]);
    const prepareData = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const rig = scene.getPlayerControllers()[0].rigManager;
        setBones(object3DSelector(rig.model, { type: 'Bone' }));
    }
    prepareData();
    const processAction = (data, type) => {
        // handle actions here
    }
    scene.setActionHandler(processAction);
    return (
        <div>
            <BoneList bones={bones} />
            <button>Test Button</button>
        </div>
    );
}
export default UserInterface;