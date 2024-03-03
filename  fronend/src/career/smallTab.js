
const SmallTab=({job,smtbclkHandler,approveJob,deleteJob,access,status})=>{
  return(
    <div className='col-5 pt-1' style={{paddingBottom:"75px"}}>
      {
        job.map((data)=>(
          <div className="card mb-4 text-start" id="smtab" key={data._id} style={access?{ height:'290px'}:{ height:'200px'}} onClick={()=>{smtbclkHandler(data)}}>
          <div className="card-body">
            <h4 className="pt-4"><b>{data.jobTitle}</b></h4>
            <p>{data.companyName}<br/><i className="bi bi-geo-alt-fill pe-2"></i>{data.jobLocation}</p>
            <div>{data.payDetails}</div>
            {access&&(status==='Active'?
              <div>
              <div className='mt-2'>
                Uploaded By:
              </div>
              <hr/>
              <div className="d-flex justify-content-end">
              <button className="btn me-2" style={{fontSize:"22px"}} onClick={()=>{deleteJob(data._id)}}>
              <i className="bi bi-trash3" style={{color:'red'}}></i>
              </button>
              </div>
              </div>
              :
              <div>
              <div className='mt-2'>
                Uploaded By:
              </div>
              <hr/>
              <div className="d-flex justify-content-end">
              <button className="btn me-2" style={{fontSize:"28px"}} onClick={()=>{approveJob(data._id)}}>
              <i class="bi bi-check-lg" style={{color:'green'}}></i>
              </button>
              <button className="btn me-2" style={{fontSize:"22px"}} onClick={()=>{deleteJob(data._id)}}>
              <i class="bi bi-x-lg" style={{color:'red'}}></i>
              </button>
              </div>
              </div>
            )}
          </div>
          </div>
        ))
      }
    </div>
  )
}
export default SmallTab;