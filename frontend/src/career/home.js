import { Link } from 'react-router-dom';

const Home=()=>{
    return (
        <div className="d-flex justify-content-center align-items-center"style={{height:'100vh',backgroundColor:'#f1f1f1'}}>
        <div className="shadow"style={{backgroundColor:"white",width:'800px',fontSize:'24px',borderRadius:'10px'}}>
        <div className="ps-5 pt-3"><b>Browse Category:</b></div>
       <ul style={{listStyleType:'none'}}>
         <li style={{paddingTop:"10px"}}><Link to="/categories/Accounting&Finance" className="btn"><i className="bi bi-caret-right-fill"></i> Accounting/Finance</Link></li>
         <li style={{paddingTop:"5px"}}><Link to="/categories/Engineer&Architects" className="btn"><i className="bi bi-caret-right-fill"> </i> Engineer/Architects</Link></li>
         <li style={{paddingTop:"5px"}}><Link to="/categories/Production&Operation"className="btn"><i className="bi bi-caret-right-fill"> </i> Production/Operation</Link></li>
         <li style={{paddingTop:"5px"}}><Link to="/categories/Hospitality&Travel" className="btn"><i className="bi bi-caret-right-fill"> </i> Hospitality/Travel</Link></li>
         <li style={{paddingTop:"5px"}}><Link to="/categories/IT&Telecommunication" className="btn"><i className="bi bi-caret-right-fill"> </i> IT/Telecommunication</Link></li>
       </ul>
       </div>
        </div>
    )
}
export default Home;