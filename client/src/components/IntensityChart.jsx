import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Modal from './Modal';
import LineChart from './LineChart';
import StackedBarChart from './StackedChart';
import { FaArrowLeft } from "react-icons/fa";

export default function IntensityChart({parm}) {
  const context = useContext(Context);
  let { getData,getDatas } = context;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("country");
  const [isModalOpen, setModalOpen] = useState(false);
  const[selected,setSelected]=useState()
  const funcdata = async () => {
    if(parm=="intensity"||parm=="livelihood"||parm=='relevance'){

      let t = await getData(query, parm); //query,intensity
      setData(t);
    }
    else{
      let t=await getDatas(query,parm);
      setData(t);
    }
    // console.log(t);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    funcdata();
  }, [query,parm]);

  return (
    <>
      <div className='flex justify-around bg-slate-100 shadow-md shadow-black py-8 px-20 animate-fadeIn rounded-xl'>
        <h1 className='text-3xl font-extrabold mx-auto'>{parm.toUpperCase()} VISUALS BY {query}</h1>
        <button
          onClick={() => setModalOpen(true)}
          className='text-md font-extrabold bg-purple-500 shadow-md shadow-black rounded-lg p-3 hover:bg-purple-600 text-white'
        >
          Filter
        </button>
      </div>
      {loading && (
        <div>
          <img
            src='https://www.bytesizedpieces.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fbytesizedpieces%2Fimage%2Fupload%2Fv1656084931%2Farticle%2Fa-how-to-guide-on-making-an-animated-loading-image-for-a-website%2Fanimated_loader_gif_n6b5x0.gif&w=1200&q=75'
            alt="Loading"
            className='mx-auto mt-5'
          />
        </div>
      )}
      {!loading && !selected && (
        <div className='ml-4 mt-5 space-y-10 animate-fadeIn'>

          <h1 className='text-3xl font-extrabold mx-auto my-2'>-------------Select what you wana see----------</h1>

        <div className='flex  space-x-40 ml-8'>
          <img src="https://media.lordicon.com/icons/wired/lineal/152-bar-chart-arrow.gif" alt=""
          className='w-80 h-80 rounded-full shadow-lg shadow-black cursor-pointer hover:shadow-xl hover:shadow-black border-2 border-black brightness-75 hover:brightness-95 contrast-200' onClick={()=>{
            setLoading(true)
            setTimeout(() => {
             setSelected("bar")
             setLoading(false)
           }, 1200);
           }} />
          <img src="https://www.datylon.com/hs-fs/hubfs/Datylon%20Website2020/Landing%20Pages/Pie%20Chart%20Maker/datylon-landing-page-pie-chart-maker-styling.gif?width=1246&height=934&name=datylon-landing-page-pie-chart-maker-styling.gif" alt="" 
          className='w-80 h-80 rounded-full shadow-lg shadow-black cursor-pointer hover:shadow-xl hover:shadow-black border-2 border-black brightness-75 hover:brightness-95 contrast-200' onClick={()=>{
            setLoading(true)
            setTimeout(() => {
             setSelected("pie")
             setLoading(false)
           }, 1200);}}/>

        </div>
        <div className='flex space-x-40 ml-8'>
        <img src="https://i.pinimg.com/originals/81/08/4d/81084d04dbcadec0b75a7d494b253d7d.gif" alt=""
          className='w-80 h-80 rounded-full shadow-lg shadow-black cursor-pointer hover:shadow-xl hover:shadow-black border-2 border-black brightness-75 hover:brightness-95 contrast-200' onClick={()=>{
            setLoading(true)
            setTimeout(() => {
             setSelected("line")
             setLoading(false)
           }, 1200);}} />
          <img src="https://images.squarespace-cdn.com/content/v1/64c4f5cffc1a5952f996c322/1698566796933-DKPQ7FEC97BASCKQRMBT/Article_thumb_animation.gif" alt="" 
          className='w-80 h-80 rounded-full shadow-lg shadow-black cursor-pointer hover:shadow-xl hover:shadow-black border-2 border-black brightness-75 hover:brightness-95 contrast-200' onClick={()=>{
            setLoading(true)
            setTimeout(() => {
             setSelected("stack")
             setLoading(false)
           }, 1200);}}/>

        </div>

        </div>
        
      )}


      {
        !loading && selected=="bar" && (
           <div className='ml-4'>
                <FaArrowLeft className='text-xl my-8 font-extrabold h-10 w-28 cursor-pointer' onClick={()=>setSelected("")}></FaArrowLeft>
            <h1 className='mt-8 mb-3 text-2xl mx-auto font-extrabold'>BAR CHART FOR {parm.toUpperCase()}</h1>
            <BarChart data={data} />
          </div>
        )
      }
      
      {
        !loading && selected=="pie" && (
           <div className='ml-4'>
             <FaArrowLeft className='text-xl my-8 font-extrabold h-10 w-28 cursor-pointer' onClick={()=>setSelected("")}></FaArrowLeft>
            <h1 className='mt-8 mb-3 text-2xl mx-auto font-extrabold'>PIE CHART FOR {parm.toUpperCase()}</h1>
            <PieChart data={data}  />
          </div>
        )
      }
      
      {
        !loading && selected=="line" && (
           <div className='ml-4'>
             <FaArrowLeft className='text-xl my-8 font-extrabold h-10 w-28 cursor-pointer' onClick={()=>setSelected("")}></FaArrowLeft>
            <h1 className='mt-8 mb-3 text-2xl mx-auto font-extrabold'>LINE CHART FOR {parm.toUpperCase()}</h1>
            <LineChart data={data} />
          </div>
        )
      }
      
      {
        !loading && selected=="stack" && (
           <div className='ml-4'>
             <FaArrowLeft className='text-xl my-8 font-extrabold h-10 w-28 cursor-pointer' onClick={()=>setSelected("")}></FaArrowLeft>
            <h1 className='mt-8 mb-3 text-2xl mx-auto font-extrabold'>SCATTER CHART FOR {parm.toUpperCase()}</h1>
            <StackedBarChart data={data}  />
          </div>
        )
      }
      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} setQuery={setQuery} />
    </>
  );
}
