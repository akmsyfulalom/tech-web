//const user=JSON.parse(localStorage.getItem('user'));
const userChecker = async (user) =>{
    const res = await fetch('/checkUser',{
        headers:{
            "Authorization":`Bearer ${user.token}`
          }
    })
    const json = await res.json();
    return json;
  }

export { userChecker };