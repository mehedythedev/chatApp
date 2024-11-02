import { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex flex-col sm:flex-row h-[100vh] sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-md bg-gray-400 border border-white bg-opacity-0">
     
    <Sidebar className="w-full sm:w-1/3 md:w-1/4 bg-gray-800 text-white p-4" />
    <MessageContainer className="flex-1 p-4 bg-white" />
  </div>




 


  
  )
}

export default HomePage;