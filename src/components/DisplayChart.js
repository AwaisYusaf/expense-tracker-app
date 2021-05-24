import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';
import FetchApi,{FetchStats} from './DataSource/FetchApi';
import styled from 'styled-components'
import {AppContext} from './DataSource/GlobalState';
import './Chart.css';
function DisplayChart({state}) {
    const [countryData,setCountryData] = useState(null);
    const [globalData,setGlobalData] = useState(null);
    const [isFetching,setFetching] = useState(false);

    useEffect(()=>{
        if(!state){
            fetchGlobalData();
        }
        else{
            console.log("useEffect().FetchingCountryData...")
            fetchCountryData(state);
        }
    },[state]);

    async function fetchCountryData(state){
        
        setFetching(true);
        const response = await FetchApi(state);
        console.log(response);
        setCountryData(response);
        setFetching(false);
    }
    
    async function fetchGlobalData(){
        if(globalData===null){
        setFetching(true);
        const response = await FetchStats();
        console.log(response);
        setGlobalData(response);
        setFetching(false);   
        }
    }

    let barData=null
    //Country Data Chart
    if(state && countryData!==null){
         barData = {
            labels:['Active Cases' , 'Recovered' , 'Deaths'],
            datasets:[{
                label:state,
                backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
                hoverBackgroundColor:['rgba(0,0,255,0.8)','rgba(0,255,0,0.8)','rgba(255,0,0,0.8)'],
                data:[countryData.confirmed,countryData.recovered,countryData.deaths]}]
        }
    }
    
    //Global Data Chart
    let lineData=null;
    if(!state && globalData!==null){
        let mConfimed = [];
        let mRecovered = [];
        let mDeaths = [];
        for(let i=0 ;i<7;i++){
            mConfimed.push(+globalData.confirmed[i]);
            mRecovered.push(+globalData.recovered[i]);
            mDeaths.push(+globalData.deaths[i]);
        }
        lineData = {
            labels:['2021-05-15',
            '2021-05-16',
            '2021-05-17',
            '2021-05-18',
            '2021-05-19',
            '2021-05-20',
            '2021-05-21'],
            datasets:[
                //DataSet for Confirmed Cases    
                {
                  data:mConfimed,
                  borderColor:'blue',
                  borderWidth:0.7,
                  cubicInterpolationMode:'monotone',
                  label:'Confirmed Cases',
                  backgroundColor:'rgb(0,0,255,0.5)',
                 
                },
                
                //DataSet for Recovered Cases
                {
                    data:mRecovered,
                    borderColor:'green',
                    borderWidth:0.7,
                    cubicInterpolationMode:'monotone',
                    label:'Recovered',
                    backgroundColor:'rgb(0,255,0,0.5)',
                    pointHoverBorderWidth:20,
                   
                  },
    
                
                //DataSet for Deaths
                {
                    data:mDeaths,
                    borderColor:'red',
                    borderWidth:0.7,
                    cubicInterpolationMode:'monotone',
                    label:'Deaths',
                    backgroundColor:'rgb(255,0, 0,0.5)',
                    clip:{
                        right:-10,
                        left:false,
                        top:false,
                        bottom:false
                    }
                  },
            ],
            
        }
    }
    
   if(isFetching){
       return(
           <Grid item container justify="center" alignItems="center">
               <Grid item xs={3} md={4} lg={5}/>
               <Grid item container xs={7} md={5} lg={3} alignItems="center" direction="row">
                    <div class="lds-ripple"><div></div><div></div></div>
                    <p>Loading Global Data...</p>
               </Grid>
               <Grid item xs={2} md={3} lg={4}/>
           </Grid>
       )
   }
   else{
    return (
        <Grid container item alignItems="center" justify="center">
            <Grid item xs={0} sm={0} md={1} lg={2}/>
            <Grid item xs={12} sm={12} md={10} lg={8}>
                {state?<Bar data={barData} width={100} height={60}/>:<Line data={lineData} width={100} height={50}/>}
                
            </Grid>
            <Grid item xs={0} sm={0} md={1} lg={2}/>
        </Grid>
    )
   }
}

const LoadingScreen = styled.div`
    display:flex;
    margin-left:640px;
    margin-top:150px;
`

export default DisplayChart;