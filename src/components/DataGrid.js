import { Card, CardContent, Grid ,makeStyles} from '@material-ui/core'
import React,{useState} from 'react';
import CountUp from 'react-countup';
import NumberFormat from 'react-number-format'

function DataGrid({type,number}) {
    
    const [isRaised,setRaised] = useState(false);
    //Category 1:Active Cases
    //Category 2:Recovered
    //Category 3:Deaths
    let borderStyle;
    if(type==="Confirmed Cases"){
        borderStyle="7px solid rgba(0,0,255,0.5)";
    }
    else if(type==="Recovered"){
        borderStyle="7px solid rgba(0,255,0,0.5)";
    }
    else if(type==="Deaths"){
        borderStyle="7px solid rgba(255,0,0,0.5)";
    }

    const useStyle = makeStyles({
        cardProp:{
            height:"200px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            textAlign:'center',
            borderBottom:props=>props.border
        }
    });
    const classes = useStyle({border:borderStyle});
    return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <Card xs={12} sm={12} className={classes.cardProp} raised={isRaised} onMouseOver={()=>setRaised(true)}  onMouseLeave={()=>setRaised(false)}>
                        <CardContent>
                            <h3>{type}</h3>
                            <h1>
                                {number==="Loading..."?number:<CountUp start={0} end={number} duration={3} separator=","/>}
                            </h1>
                        </CardContent>
                    </Card>
      </Grid>
    )
}


export default DataGrid
