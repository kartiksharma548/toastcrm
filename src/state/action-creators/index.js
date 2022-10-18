export const getLead=(lead_Id)=>{
    return (dispatch)=>{
        dispatch({
            type:'lead',
            payload:lead_Id
        })
    }
}

export const getSelectedSchedule=(sch)=>{
    return (dispatch)=>{
        dispatch({
            type:'schedule',
            payload:sch
        })
    }
}