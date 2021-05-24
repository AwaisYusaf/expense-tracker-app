import React, {useEffect, useState} from 'react'
import {Button, Card,CardContent,Dialog,DialogActions,DialogContent,DialogTitle,FormControl,Grid,InputLabel,makeStyles, MenuItem, NativeSelect, Select, withStyles} from '@material-ui/core';
import styled from 'styled-components';
import DataGrid from './DataGrid';
import InputBase from '@material-ui/core/InputBase';
import DisplayChart from './DisplayChart';
import FetchApi,{fetchCountries,FetchGlobalData} from './DataSource/FetchApi';
const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));



function Home() {
   const [isOpen,setOpen] = useState(false);
   const [requiredCountry,setCountry] = useState("");
   const [countryName,setCountryName] = useState("");
   const [isFetching,setFetching] = useState(true);
   const [GlobalData,setGlobalData] = useState(null);
   const [countriesList,setCountriesList] = useState([{Country:"Global",ISO2:""}]);
   const classes = useStyles();

   useEffect(async ()=>{
     load();
     }
   ,[]);

   
    function handleChange(e){
      setCountry(e.target.value);
      console.log(e.target.key);
      setOpen(false);
    }

    async function load(){
      setFetching(true);
      const result = await fetchCountries();
      setCountriesList(result);
      const mGlobalData = await FetchGlobalData();
      setGlobalData(mGlobalData);
      console.log(mGlobalData);
      setFetching(false);
    }


   function loadCountryOnClose() {
     //Fetch country Data and display it
     FetchApi(requiredCountry);
   }


   
    return (
        <Grid container>
            <Grid item xs={0} sm={1} md={1} lg={2}/>
            <Grid item xs={12} sm={10} md={10} lg={8}>
            <Grid item container justify="center" direction="column" alignItems="center" spacing={5}>               
                
                {/* DataGrid shows all cases */}
                <Grid item container spacing={3} justify="center">
                  <DataGrid type="Confirmed Cases" number={isFetching?"Loading...":GlobalData.Global.TotalConfirmed}/>
                  <DataGrid type="Recovered" number={isFetching?"Loading...":GlobalData.Global.TotalRecovered}/>              
                  <DataGrid type="Deaths" number={isFetching?"Loading...":GlobalData.Global.TotalDeaths}/>
                </Grid>
                <Grid item container spacing={8}>
                        <ButtonContainer>
                            <SelectButton onClick={()=>setOpen(true)}><p>Select</p></SelectButton>                        
                            <Dialog open={isOpen} onClose={()=>setOpen(false)}>
                                <DialogTitle>Select Country</DialogTitle>
                                <DialogContent>                             
                                                <FormControl className={classes.margin}>
                                                        <InputLabel htmlFor="demo-customized-select-native">Country</InputLabel>
                                                        <NativeSelect
                                                        id="demo-customized-select-native"
                                                        value={requiredCountry}
                                                        onChange={handleChange}
                                                        input={<BootstrapInput/>}
                                                        defaultValue={requiredCountry}
                                                        defaultChecked
                                                        value={requiredCountry}
                                                        >
                                                          <option value="">Global</option>
                                                            {
                                                              countriesList.map((country,index)=>{
                                                                return <option key={country.Country} title={country.Country} value={country.slug}>{country.Country}</option>
                                                              })
                                                            
                                                            }                                                            
                                                        </NativeSelect>
                                                </FormControl>
                                </DialogContent>
                            </Dialog>
                        </ButtonContainer>     
                        <DisplayChart state={requiredCountry}/>
                </Grid>
            </Grid>
            </Grid>
            <Grid item xs ={0} sm={1} md={1} lg={2}/>
        </Grid>
    )
}


const ButtonContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%
`
const SelectButton = styled.div`
    width:30%;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:100px;
    text-transform:uppercase;
    font-weight:600;
    color:white;
    background: rgb(163,29,252);
    background: linear-gradient(90deg, rgba(163,29,252,1) 6%, rgba(231,101,101,1) 50%, rgba(226,198,158,1) 100%);
    @media (max-width:790px){
        width:60%
    }
    cursor:pointer;


`


const CustomCard = styled(Card)`
    


`
const CustomSelect = styled(Select)`
width :100%,


`


export default Home
