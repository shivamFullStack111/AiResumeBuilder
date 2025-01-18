import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { ResumeType } from './../../resumeEdit/editPage1/WorkExperience';
import { createSlice } from "@reduxjs/toolkit";



interface StateProps {
  resume:ResumeType | null
  myResumes:ResumeType[] 
}

const inititalState:StateProps  = {
  resume:null,
  myResumes:[],
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

  }
})

export default resumeSlice.reducer 
export const {setResume,updateResume,setMyResumes}=resumeSlice.actions