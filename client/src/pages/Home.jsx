import React, { useEffect, useState } from 'react';
import IntensityChart from '../components/IntensityChart'
import LikelihoodChart from '../components/LikelihoodChart'
import { useNavigate } from 'react-router-dom';
// Import other components as needed

const Home = () => {
    const navigate=useNavigate()
    // useEffect(()=>{
    //     if(!localStorage.getItem('token')){
    //         alert("Please login first");
    //         navigate('/login')
    //     }
    // },[])
  const [selectedComponent, setSelectedComponent] = useState('Intensity');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Intensity':
        return <IntensityChart parm={"intensity"}/>;
      case 'Likelihood':
        return <IntensityChart parm={"likelihood"} />;
      case 'Relevance':
        return <IntensityChart parm={"relevance"} />;
      case 'Year':
        return <IntensityChart parm={"year"} />;
      case 'Country':
          return <IntensityChart parm={"country"} />;
      case 'Topics':
          return <IntensityChart parm={"topics"} />;
      case 'Region':
          return <IntensityChart parm={"region"} />;
      case 'City':
          return <IntensityChart parm={"city"} />;
      // Add more cases for other components
      default:
        return <IntensityChart parm={"intensity"}/>;
    }
  };

  return (
    <>
    <div className=" h-screen fixed left-0 ">
      {/* Sidebar / Drawer */}
      <div className="bg-black text-white w-64 p-4  space-y-4 h-screen overflow-hidden">
  <h2 className="text-xl font-bold mb-4">Variables</h2>
  <ul className='space-y-3'>
  <li 
    onClick={() => setSelectedComponent('Intensity')} 
    className={`cursor-pointer hover:bg-[#393939] rounded-lg p-3 ${selectedComponent === 'Intensity' ? 'bg-[#393939]' : ''}`}
    >
    Intensity
  </li>
  <li 
    onClick={() => setSelectedComponent('Likelihood')} 
    className={`cursor-pointer hover:bg-[#393939] rounded-lg p-3 ${selectedComponent === 'Likelihood' ? 'bg-[#393939]' : ''}`}
    >
    Likelihood
  </li>
  <li 
    onClick={() => setSelectedComponent('Relevance')} 
    className={`cursor-pointer hover:bg-[#393939] rounded-lg p-3 ${selectedComponent === 'Relevance' ? 'bg-[#393939]' : ''}`}
    >
    Relevance
  </li>
  <li 
    onClick={() => setSelectedComponent('Year')} 
    className={`cursor-pointer hover:bg-[#393939] rounded-lg p-3 ${selectedComponent === 'Year' ? 'bg-[#393939]' : ''}`}
  >
    Year
  </li>
  <li 
    onClick={() => setSelectedComponent('Country')} 
    className={`cursor-pointer hover:bg-[#393939] rounded-lg p-3 ${selectedComponent === 'Country' ? 'bg-[#393939]' : ''}`}
  >
    Country
  </li>
  <li 
    onClick={() => setSelectedComponent('Topics')} 
    className={`cursor-pointer hover:bg-[#393939] rounded-lg p-3 ${selectedComponent === 'Topics' ? 'bg-[#393939]' : ''}`}
    >
    Topics
  </li>
  <li 
    onClick={() => setSelectedComponent('Region')} 
    className={`cursor-pointer hover:bg-[#393939] rounded-lg p-3 ${selectedComponent === 'Region' ? 'bg-[#393939]' : ''}`}
    >
    Region
  </li>
  <li 
    onClick={() => setSelectedComponent('City')} 
    className={`cursor-pointer hover:bg-[#393939] rounded-lg p-3 ${selectedComponent === 'City' ? 'bg-[#393939]' : ''}`}
    >
    City
  </li>
</ul>


</div>

    </div>
      {/* Main Content Area */}
      <div className="  ml-60 px-10 ">
        {renderComponent()}
      </div>
    </>

  );
};

export default Home;
