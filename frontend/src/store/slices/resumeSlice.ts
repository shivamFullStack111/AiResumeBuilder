import {  FormatingType } from '../../utils';
import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { ResumeType } from './../../resumeEdit/editPage1/WorkExperience';
import { createSlice } from "@reduxjs/toolkit";



interface StateProps {
  resume:ResumeType | null
  myResumes:ResumeType[] 
  formating:FormatingType
}

const inititalState:StateProps  = {
  resume:null,
  myResumes:[],
  formating:{
    fontSize: 20,
    headingSize: 14,
    sectionSpacing: 5,
    paragraphSpreading: 5,
    lineSpacing: 1.5,
    fontFamily: "Arial, sans-serif",
    fontColor:"text-black",
    imageSize:60
  },

}


const resumeSlice = createSlice({
  name: "resume",
  initialState:inititalState,
  reducers:{
    setResume:(state,action:PayloadAction<ResumeType>)=>{
      state.resume = action.payload
    },
    updateResume:(state,action:PayloadAction<ResumeType>)=>{
      state.resume = {...state.resume,...action.payload}
    },
    setMyResumes:(state,action:PayloadAction<ResumeType[]>)=>{
      state.myResumes = action.payload
    },
    setformating:(state,action:PayloadAction<FormatingType>)=>{
      state.formating = {...state.formating,...action.payload}

    }
   

  }
})

export default resumeSlice.reducer 
export const {setResume,updateResume,setMyResumes,setformating}=resumeSlice.actions