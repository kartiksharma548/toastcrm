import api from './api';

export const getLeads=(userid,data)=>{
    return api.post('getLead/'+userid,data);
}

export const getStatuses=()=>{
    return api.get('getStatuses');
}

export const saveLeadForm=(data,id)=>{
    return api.post('updateLead/'+id,data);
}

export const getNotes=(lead_id)=>{
    return api.get('getNotes/'+lead_id);
}

export const saveNote=(data)=>{
    return api.post('createNote',data);
}

export const deleteNote=(noteId)=>{
    return api.delete('deleteNote/'+noteId);
}

export const updateNote=(data,noteId)=>{
    return api.post('updateNote/'+noteId,data);
}

export const getSchedules=(id)=>{
    return api.get('schedule/'+id);
}

export const saveSchedule=(data)=>{
    return api.post('schedule',data);
}

export const updateSchedule=(data,id)=>{
    return api.put('schedule/'+id,data);
}
export const deleteSchedule=(id)=>{
    return api.delete('schedule/'+id);
}

export const getSubStatuses=(id,obj)=>{
    return api.post('getSubStatuses/'+id,obj);
}

export const getCancelledStatuses=()=>{
    return api.get('getCancelledStatuses');
}


export const changeStatus=(data)=>{
    return api.post('changeStatus',data);
}

export const getLeadChartData=(id)=>{
    return api.get('getLeadChartData/'+id);
}

export const getClientConversionData=(id)=>{
    return api.get('getClientConversionData/'+id);
}

export const updateUserProfile=(id,data)=>{
    return api.post('updateUserProfile/'+id,data);
}
