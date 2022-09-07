import { useEffect,useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const[data,setdata]=useState([]);
  const[dataLimit,setdataLimit]=useState(5);
  const[pageSkipLimit,setPageSkipLimit]=useState(0);
  useEffect(() => {
    axios.get(`https://dummyjson.com/products?skip=${pageSkipLimit*dataLimit}&limit=${dataLimit}`)
    .then(
      function(response){
        setdata(response.data.products)
      }
    ).catch(function(error){
     alert(error.message);
    }) 
    window.addEventListener('scroll', handleScroll); 
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      console.log('Fetch more list items!');
      setdataLimit(dataLimit+5);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dataLimit,pageSkipLimit])
  return (
    <div className='container'>
      {
        data.map((item,ind)=>(
        <div className ='productContainer' key={ind}>
        <img className ='productImage' src={item.images[0]} alt="itemImage"></img>
        <h2 className ='productTitle'>{item.title}</h2>
        <p className ='product-description'>{item.description} </p>
        </div>
        )
        )
      }  
    </div>
  );
}

export default App;
