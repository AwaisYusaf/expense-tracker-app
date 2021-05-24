



export default async function FetchApi(country) {
    
    //Fetch Data using country code
        let data = await fetch('https://api.covid19api.com/live/country/'+country+'/status/confirmed');
        let result = await data.json();
        console.log(country+" data:");
        console.log(result);

        let confirmed = 0;
        let recovered = 0;
        let deaths = 0;
        for(let i=0 ;i<result.length;i++){
            confirmed+=result[i].Active;
            recovered+=result[i].Recovered;
            deaths+=result[i].Deaths;
        }
        return {confirmed,recovered,deaths};
}

export async function FetchGlobalData(){
            let data = await fetch('https://api.covid19api.com/summary');
            let result = await data.json();
            console.log("Fetched Global Data:")
            console.log(result);
            return {Global:result.Global}
};


export async function FetchStats(){
    const dates = ['2021-05-15',
                    '2021-05-16',
                    '2021-05-17',
                    '2021-05-18',
                    '2021-05-19',
                    '2021-05-20',
                    '2021-05-21'];
    let mDates=[];
    let mConfirmedCases=[];
    let mRecoveredCases=[];
    let mDeaths=[];


    for(let i=0 ; i<dates.length ;i++){
        let date = dates[i];
        const response = await fetchDailyRecord(date);
        mDates.push(date);
        mConfirmedCases.push(response.data.confirmed);
        mRecoveredCases.push(response.data.recovered);
        mDeaths.push(response.data.deaths);
    }

    let records = {dates:[mDates],confirmed:mConfirmedCases,recovered:mRecoveredCases,deaths:mDeaths}

    return records;         
}

async function fetchDailyRecord(date){
    const response = await fetch("https://covid-19-statistics.p.rapidapi.com/reports/total?date="+date, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "9ebe697120msha6d957b07594f90p10393djsnccf1af693ddf",
                "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
            }
        });
    const data = await response.json();
    return data;
}

export async function fetchCountries(){
    let data = await fetch('https://api.covid19api.com/countries');
    let result = await data.json();
    console.log("Result:");
    console.log(result);
    return result;
}