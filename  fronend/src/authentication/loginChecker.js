let isLogged=null;
const loginChecker=()=>{
    isLogged=JSON.parse(localStorage.getItem('user'));
}

export {isLogged,loginChecker}