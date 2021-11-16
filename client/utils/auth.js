import decode from "jwt-decode";

class AuthService {

    //should extract the user data from the token
    //check usage elsewhere
    getProfile(){
        return decode(this.getToken())
    }

    loggedIn(){
        const token = this.getToken();
        //double NOT coerces to a boolean. Done in sample code but sure on efficacy vs truthy/falsey
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            //check for expiry
            //adjust for time differential in s vs ms
            if (decoded.exp < Date.now() / 1000){
                return true
            } else return false;
        } catch(err) {
            return false;
        }
    }

    getToken(){
        return localStorage.getItem("id_token")
    }

    login(idToken){
        localStorage.setItem("id_token", idToken);
        //To do Reassign window location
    }

    logout() {
        localStorage.removeItem("id_token")
    }

}

export default new AuthService();