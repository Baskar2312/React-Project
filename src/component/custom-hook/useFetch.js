import { useEffect,useState } from "react";
import axios from 'axios'

//useFetch will return the object here.
function useFetch(url){
    let [products, setProducts] = useState([]);  //to recieve the state 
    let [error, setError] = useState("");      //to handle the errors
    let [isLoading, setIsLoading] = useState(true);   //to handle pending state
    useEffect(()=>{
        let fetchApi = async ()=>{
            try{ 
                let response = await axios.get(url);
                setProducts(response.data);
                // let response = await fetch(url)
                // if(response.ok){
                //     let data=await response.json();
                //     setProducts(data);
                // }
                // else{
                //     throw new Error("Data not Found");
                // }
            }
            catch(error){
                setError(error.message);
            }
            finally{
                setIsLoading(false);
            }

        }
        fetchApi();
    },[])
    return {products,error,isLoading,setProducts}
}

export default useFetch;