import BoneForm from './BoneForm'; 
import './BoneList.css';
const BoneList = ({ bones }) => {
    return (
        <div className="bone-list">
            {bones.map(bone => <BoneForm bone={bone} />)}
        </div>
    );
}

export default BoneList;