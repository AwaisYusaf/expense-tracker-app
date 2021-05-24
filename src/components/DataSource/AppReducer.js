

function AppReducer(state,action){
    if(action.type==="set"){
        return {data:action.payload}
    }
    else{
        return state;
    }
}
export default AppReducer;