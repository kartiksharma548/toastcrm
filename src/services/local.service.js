class LocalService {
    
    get(key) {
      // @ts-ignore
      return localStorage.getItem(key);
    }
    // @ts-ignore
    set(key,value) {
      
      localStorage.setItem(key, value);
    }
    remove(key) {
      localStorage.removeItem(key);
    }
    clear() {
      localStorage.clear();
    }
  }
  export default new LocalService();