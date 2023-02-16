import { GETDATA,ADDPRODUCT } from "./actionTypes";

let initialdata = {
data:{},
ProductId:null,
faqs:[],
description:"",
}


const AppReducer=(state=initialdata,{type,payload})=>{
    switch(type){
      case GETDATA:{
         console.log(payload)
         return {...state,data:payload,ProductId:payload._id,faqs:payload.faqs,description:payload.description,}
      }
      case ADDPRODUCT:{
      
         return {...state}
      }
 default :{
    return state;
 }
    }

}
export default AppReducer