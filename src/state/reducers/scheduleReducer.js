const reducer=(state=null,action)=>{
    if(action.type=='schedule'){
        return action.payload==undefined?null:action.payload;
    }
    else{
        return state;
    }
}

export default reducer

