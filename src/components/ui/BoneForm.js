import { useState } from 'react'; 
import { degreesToRadians, radiansToDegrees } from '../../utils/Utilities';
import './BoneForm.css';
const BoneForm = ({ bone, scaling }) => {
    const _scale = { ...bone.scale };
    const [rx, setRx] = useState(radiansToDegrees(bone.rotation.x).toString());
    const [ry, setRy] = useState(radiansToDegrees(bone.rotation.y).toString());
    const [rz, setRz] = useState(radiansToDegrees(bone.rotation.z).toString());
    const [sx, setSx] = useState(bone.scale.x.toString());
    const [sy, setSy] = useState(bone.scale.y.toString());
    const [sz, setSz] = useState(bone.scale.z.toString());
    const [open, setOpen] = useState(false);
    const rxChange = (e) => {
        const value = e.target.value;
        if(!isNaN(value)){
            bone.rotation.x = degreesToRadians(Number(e.target.value));
            setRx(e.target.value);
        }
    }
    const ryChange = (e) => {
        const value = e.target.value;
        if(!isNaN(value)){
            bone.rotation.y = degreesToRadians(Number(e.target.value));
            setRy(e.target.value);
        }
    }
    const rzChange = (e) => {
        const value = e.target.value;
        if(!isNaN(value)){
            bone.rotation.z = degreesToRadians(Number(e.target.value));
            setRz(e.target.value);
        }
    }

    const sxChange = (e) => {
        const value = e.target.value;
        if(!isNaN(value)){
            bone.scale.x = Number(e.target.value);
            setSx(e.target.value);
        }
    }
    const syChange = (e) => {
        const value = e.target.value;
        if(!isNaN(value)){
            bone.scale.y = Number(e.target.value);
            setSy(e.target.value);
        }
    }
    const szChange = (e) => {
        const value = e.target.value;
        if(!isNaN(value)){
            bone.scale.z = Number(e.target.value);
            setSz(e.target.value);
        }
    }
    const onToggled = () => {
        setOpen(open ? false : true);
    }
    return (
        <div className="bone-form">
            <h3><a onClick={onToggled}>{bone.name}</a></h3>
            <div className={open ? 'expanded' : ''}>
                <h4>Rotation</h4>
                <ul>
                    <li><label><span>X</span><input type="number" value={rx} onChange={rxChange} /></label></li>
                    <li><label><span>Y</span><input type="number" value={ry} onChange={ryChange} /></label></li>
                    <li><label><span>Z</span><input type="number" value={rz} onChange={rzChange} /></label></li>
                </ul>
                <h4>scale</h4>
                <ul>
                    <li><label><span>X</span><input type="number" value={sx} onChange={sxChange} /></label></li>
                    <li><label><span>Y</span><input type="number" value={sy} onChange={syChange} /></label></li>
                    <li><label><span>Z</span><input type="number" value={sz} onChange={szChange} /></label></li>
                </ul>
            </div>
        </div>
    );
}
export default BoneForm;

