const reducer=(state=1,action)=>{
    if(action.type=='lead'){
        return action.payload;
    }
    else{
        return state;
    }
}

export default reducer

