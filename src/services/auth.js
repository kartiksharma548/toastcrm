import localService from "./local.service";


class Auth {


    isAuthenticated() {
        if (localService.get('user') != null)
            return true
        return false
    }

    logout(){
        localService.clear();
        
    }

}

export default new Auth()