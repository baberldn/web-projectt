import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiaShareAltSolid } from "react-icons/lia";
import { PiPlantLight } from "react-icons/pi";
import { BiImageAdd } from "react-icons/bi"; 
import { RiLiveLine } from "react-icons/ri";
import { PiCowFill } from "react-icons/pi";
import { AiOutlineNumber } from "react-icons/ai";
import { PiFarmFill } from "react-icons/pi";
import { TbBook2 } from "react-icons/tb";
import { PiPlantFill } from "react-icons/pi";

const ImageModal = ({ isOpen, onClose }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [farmName, setFarmName] = useState("");
    const [farmSize, setFarmSize] = useState("");
    const [cropType, setCropType] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        console.log("Farm Name:", farmName);
        console.log("Farm Size:", farmSize);
        console.log("Crop Type:", cropType);
        console.log("Image URL:", imageUrl);
        console.log("Selected File:", selectedFile);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="image-modal-title">Farm Details</h2>
                <div className="input-container">
                <div style={{ display: 'flex', alignItems: 'center' }}>
       <PiFarmFill style={{ marginRight: '8px', fontSize: '60px', marginTop: '20px', color: '#4A7A4C', marginLeft: '-60px', }} /> 
              <input 
             type="text" 
           className="farm-name-input"
          placeholder="Farm Name"
           value={farmName}
        onChange={(e) => setFarmName(e.target.value)}
     />
         </div>



                </div>

                
                <div className="input-container">
                    <input 
                        type="text" 
                        className="farm-size-input"
                        placeholder="Farm Size (in acres)"
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                    />
                </div>
                <button 
                    className="add-image-button"
                    onClick={() => document.getElementById('file-input').click()}
                >
                    Upload Farm Image
                    <BiImageAdd style={{ marginLeft: '10px', fontSize: '24px', verticalAlign: 'middle', color:'#4A7A4C'}} /> 
                </button>
                <input 
                    type="file" 
                    id="file-input"
                    className="file-input"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                
                <div className="input-container" >
                <div style={{ display: 'flex', alignItems: 'center' }}>
    <TbBook2 style={{ marginRight: '8px', fontSize: '60px', marginTop: '20px', color: '#4A7A4C', marginLeft: '-60px', }} /> 
    <select 
        className="crop-type-dropdown"
        onChange={(e) => setCropType(e.target.value)}
    >
        <option value="">Crop Type</option>
        <option value="crop1">Crop 1</option>
        <option value="crop2">Crop 2</option>
        <option value="crop3">Crop 3</option>
    </select>
    </div>
</div>
                <button 
                    className="submit-button"
                    onClick={handleSubmit}
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
};

const EfficacyModal = ({ isOpen, onClose, onAddImage }) => {
    const [selectedOption, setSelectedOption] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        console.log("Selected Option:", selectedOption);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="back-button" onClick={onClose}>BACK</button>
                <h2 className="crop-details-title">CROP DETAILS</h2>
                <div className="input-container" >
                <div style={{ display: 'flex', alignItems: 'center' }}>
    <PiPlantFill style={{ marginRight: '8px', fontSize: '60px', marginTop: '-40px', color: '#4A7A4C', marginLeft: '-60px', }} />
    <select 
       className='dropdown-menu-crop'
        onChange={(e) => setCropType(e.target.value)}
    >
        <option >Crop Name</option>
        <option value="crop1">Crop 1</option>
        <option value="crop2">Crop 2</option>
        <option value="crop3">Crop 3</option>
    </select>
    </div>
</div>
                <input 
                    type="text" 
                    className="soil-type-input"
                    placeholder="Soil Type"
                />
                <button 
                    className="add-image-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddImage();
                    }}
                >
                    ADD IMAGE
                    <BiImageAdd style={{ marginLeft: '10px', fontSize: '24px', verticalAlign: 'middle' }} /> 
                </button>
                <button 
                    className="submit-button"
                    onClick={handleSubmit}
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
};

const FarmAnalytics = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const soilData = [
        { name: 'Nitrogen', value: '20', status: 'GOOD' },
        { name: 'Phosphorus', value: '8', status: 'GOOD' },
        { name: 'Potassium', value: '13', status: 'GOOD' }
    ];

    const additionalData = [
        { name: 'Humidity', value: '15', status: 'GOOD', statusColor: '#23aa27' },
        { name: 'Soil Hydration', value: '40', status: 'HIGH', statusColor: '#aa2323' },
        { name: 'PH Value', value: '4', status: 'LOW', statusColor: '#ffa500' }
    ];

    const farmInfo = [
        { 
            label: (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    <PiPlantLight size={22} />
                    <span style={{ marginLeft: '8px', marginTop: '-2px' }}>Crop : </span>
                </div>
            ), 
            value: <span style={{ marginTop: '8px' }}>Wheat</span>
        },
        { 
            label: (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    <LiaShareAltSolid size={32} />
                    <span style={{ marginLeft: '8px', marginTop: '-2px' }}>Area:</span>
                </div>
            ), 
            value: <span style={{ marginTop: '8px' }}>25 Acres</span>
        }
    ];

    return (
        <div className="content-panel farm-analytics">
            <h2 className="farm-title">FARM 1</h2>
            <div className="soil-stats">
                {soilData.map((item, index) => (
                    <div key={index} className="stat-box">
                        <div className="stat-content">
                            <span className="stat-label">{item.name}: </span>
                            <span className="stat-value">%{item.value}</span>
                        </div>
                        <div className="stat-status">{item.status}</div>
                    </div>
                ))}
            </div>

            <div className="lower-content">
                <div className="additional-stats">
                    {additionalData.map((item, index) => (
                        <div key={index} className="stat-box">
                            <div className="stat-content">
                                <span className="stat-label">{item.name}: </span>
                                <span className="stat-value">
                                    {item.name === 'PH Value' ? item.value : `%${item.value}`}
                                </span>
                            </div>
                            <div 
                                className="stat-status"
                                style={{ 
                                    borderColor: item.statusColor,
                                    color: item.statusColor
                                }}
                            >
                                {item.status}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="farm-image-section">
                    <img 
                        src="images/image4.png" 
                        alt="Farm" 
                        className="farm-image"
                    />
                    <div className="farm-info-boxes">
                        {farmInfo.map((item, index) => (
                            <div key={index} className="info-box">
                                <span className="info-label">{item.label}</span>
                                <span className="info-value">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div 
                className="efficacy-box"
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                <span className="efficacy-text">Efficacy Rating</span>
            </div>

            <EfficacyModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddImage={() => {
                    setIsModalOpen(false);
                    setIsImageModalOpen(true);
                }}
            />

            <ImageModal 
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
            />
        </div>
    );
};

const Livestock = () => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false); 
    const [count, setCount] = useState(""); 
    const [breed, setBreed] = useState(""); 
    const [age, setAge] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); 
    const [imageUrl, setImageUrl] = useState(""); 
    const [gender, setGender] = useState(""); 
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        console.log("Count:", count);
        console.log("Breed:", breed);
        console.log("Age:", age);
        console.log("Gender:", gender);
        console.log("Image URL:", imageUrl);
        console.log("Selected File:", selectedFile);
        setIsImageModalOpen(false); 
    };

    const handleAddCattle = () => {
        setIsImageModalOpen(true);
    };

    return (
        <div className="livestock-panel">
            <h2 className="manage-livestock-title">Manage Livestock</h2>
            <div className="button-container button-container-right">
                <button className="livestock-button" style={{ marginLeft: 'auto' }}>
                    <RiLiveLine style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: '21px' }} />
                    View Live
                </button>
                <button className="livestock-button" onClick={handleAddCattle}>+ Add Cattle</button>
            </div>
            <div className="button-container button-container-left">
                <button className="total-button">Total: 63</button>
                <button className="area-button">
                    <LiaShareAltSolid size={30} style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: '20px', marginBottom:'2px'}} />
                    Area: 25 ACRES
                </button>
            </div>

           
            <div className="boxes-container">
                <div className="animal-box">
                    <h3 className="animal-title">GOAT :</h3>
                    <p className="animal-info">Count:</p>
                    <p className="animal-info">Breed:</p>
                    <p className="animal-info">Males:</p>
                    <p className="animal-info">Females:</p>
                    <div className="image-container">
                        <img src="images/goat.png" alt="Goat" className="animal-image" />
                        <span className="overlay-text">+5</span>
                    </div>
                </div>

               
                <div className="animal-box">
                    <h3 className="animal-title">COW :</h3>
                    <p className="animal-info">Count:</p>
                    <p className="animal-info">Breed:</p>
                    <p className="animal-info">Males:</p>
                    <p className="animal-info">Females:</p>
                    <div className="image-container">
                        <img src="images/cow.png" alt="Cow" className="animal-image" />
                        <span className="overlay-text">+2</span>
                    </div>
                </div>
            </div>

           
            {isImageModalOpen && (
                <div className="modal-overlay" onClick={() => setIsImageModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 className="image-modal-title">CATTLE DETAILS</h2>
                        <div className="input-container">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <PiCowFill style={{ marginRight: '8px', fontSize: '60px', marginLeft: '-60px', marginTop: '20px' , color:'#4A7A4C'}} />
                                <input 
                                    type="text" 
                                    className="farm-name-input"
                                    placeholder="Enter the Cattle Type"
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                    style={{ flex: 1 }} 
                                />
                            </div>
                        </div>
                        <div className="input-container">
                            <input 
                                type="text" 
                                className="farm-size-input"
                                placeholder="Enter the Breed"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AiOutlineNumber style={{ marginRight: '8px', fontSize: '60px', marginTop: '20px', color: '#4A7A4C', marginLeft: '-60px', }} />
                                <input 
                                    type="text" 
                                    className="farm-size-input"
                                    placeholder="Count"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    style={{ flex: 1 }} 
                                />
                            </div>
                        </div>
                        <button 
                            className="add-image-button"
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            Image
                            <BiImageAdd style={{ marginLeft: '10px', fontSize: '24px', verticalAlign: 'middle', color:'#4A7A4C'}} /> 
                        </button>
                        <input 
                            type="file" 
                            id="file-input"
                            className="file-input"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <div className="input-container">
                            <select className="dropdown-menu" onChange={(e) => setGender(e.target.value)}>
                                <option value="">Males/Females</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <button 
                            className="submit-button"
                            onClick={handleSubmit}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'analytics':
                return <FarmAnalytics />;
            case 'livestock':
                return <Livestock />;
            case 'dashboard':
                return (
                    <div className="content-panel">
                        <div className="header-container">
                            <h2 className="title">Manage Livestock</h2>
                            <button className="view-button">
                                <RiLiveLine style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: '21px' }} />
                                View Live
                            </button>
                        </div>
                        <div>
                            <p className="farms-text">FARMS</p>
                            <p className="area-text">AREA:</p>
                            <p className="expected-harvest-text">Expected date of Harvest:</p>
                        </div>
                        <div className="boxes-container-dashboard">
                            <div className="left-box">
                                <img src="images/image5.png" alt="Description" className="image" />
                            </div>
                            <div className="right-box">
                                <h3 className="crops-distribution-title">Crops Distribution</h3>
                                <img src="images/circle.png" alt="Crops" className="crops-image" />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!currentUser) return null;

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="profile-section">
                    <img 
                        src="images/image3.png"
                        alt="Profile" 
                        className="profile-image"
                    />
                    <h2 className="username">{currentUser.username}</h2>
                    
                    <nav className="nav-links">
                        <button 
                            className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('analytics')}
                        >
                            FARM ANALYTICS
                        </button>
                        
                        <button 
                            className={`nav-link ${activeTab === 'livestock' ? 'active' : ''}`}
                            onClick={() => setActiveTab('livestock')}
                        >
                            LIVESTOCK
                        </button>
                        
                        <button 
                            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            DASHBOARD
                        </button>
                    </nav>

                    <button className="add-farm-button">
                      +  ADD FARM
                    </button>
                </div>
            </div>

            {renderContent()}

            {!activeTab && (
                <button onClick={handleLogout} className="logout-button">
                    Çıkış Yap
                </button>
            )}
        </div>
    );
};

export default Dashboard;