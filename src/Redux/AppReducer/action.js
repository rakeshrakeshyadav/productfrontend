import { GETDATA,ADDPRODUCT } from "./actionTypes";
import axios from "axios";

export const searchData = (queryType,productname)=>(dispatch)=>{

    try{        
        axios.get(
          `https://thepipingmart.up.railway.app/${queryType}/${productname}`
        ).then((res)=>
        // console.log(res)
        dispatch({type:GETDATA,payload:res.data})
        )
        return "success";
      }catch(err){
        console.log(err);
        
      }
}
export const AddProduct = (AddDetails)=>(dispatch)=>{

    try{        
      axios.post(
        "https://thepipingmart.up.railway.app/product",
        AddDetails
      ).then((res)=>
        // console.log(res)
        dispatch({type:ADDPRODUCT})
        )
        return "success";
      }catch(err){
        console.log(err);
        
      }
}