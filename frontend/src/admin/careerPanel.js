import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SmallTab from '../career/smallTab';


const CareerPanel=()=>{

  const [showCategory,setShowCategory]=useState("All");
  const {category}=useParams();
  const [jobs,setJobs]=useState();
  const [detailedJob,setDetailedJob]=useState("");
  const [lgtabActive,setLgtabActive]=useState(false);
  const [jobShower,setJobShower]=useState("Active");

  const fetchByCategory= async (cat) =>{
    const res = await fetch(`/status/${jobShower}/${cat}`,
      // headers:{
      //   "Authorization":`Bearer ${us.token}`
      // }
    )
    const json = await res.json()
    console.log(json);
    setJobs(json);
  }

  useEffect(()=>{
    const us=JSON.parse(localStorage.getItem('user'));
    if(category==null)
    {
        const fetchActiveJobs= async () =>{
        const res = await fetch('/status/Active')
        const json = await res.json()
        setJobs(json);
      }
      fetchActiveJobs();
    }
    else
    {
      fetchByCategory(us);
    }
    },[]);
    const CategoryDisplay=()=>{
      // if(category!=null)
      // return <><b className='ps-2'>Category: </b>{category}</>
      // else
      // return <><b className='ps-2'>Category: </b> All</>
      return (
        <>
        <b className='ps-2'>Category: </b>
        <div className="btn dropdown-toggle ms-1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{showCategory}</div>
        <div className=" dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" onClick={()=>{
            setShowCategory("Accounting/Finance")
            fetchByCategory("Accounting&Finance")
          }}>Accounting/Finance</button>
          <button className="dropdown-item" onClick={()=>{
            setShowCategory("Engineer/Architects")
            fetchByCategory("Engineer&Architects")
          }}>Engineer/Architects</button>
          <button className="dropdown-item" onClick={()=>{
            setShowCategory("Production/Operation")
            fetchByCategory("Production&Operation")
          }}>Production/Operation</button>
          <button className="dropdown-item" onClick={()=>{
            setShowCategory("Hospitality/Travel")
            fetchByCategory("Hospitality&Travel")
          }}>Hospitality/Travel</button>
          <button className="dropdown-item" onClick={()=>{
            setShowCategory("IT/Telecommunication")
            fetchByCategory("IT&Telecommunication")
          }}>IT/Telecommunication</button>
        </div>
      </>
      )
    }
    const UrlChecker=()=>{
      if(detailedJob.url!=='')
      {
        return <a href={detailedJob.url} target="_blank">{detailedJob.companyName}</a>
      }
      else
      {
        return <>{detailedJob.companyName}</>
      }
    }
    const PhnNumChecker=()=>{
      if(detailedJob.phoneNumber!=='')
      {
        return <>Mobile :{detailedJob.phoneNumber}</>
      }
      else
      {
        return null
      }
    }
    const approveJob = async (id)=>{
      console.log(id);
      const response = await fetch('/update_status/'+id,{
        method: 'PATCH'
      })
      const fetchAfterPatch= async () =>{
        const res = await fetch('/status/Pending')
        const json = await res.json()
        setJobs(json);
        setLgtabActive(false);
        console.log(response);
      }
      fetchAfterPatch();
    }
    const deleteJob = async (id)=>{
        const response = await fetch('/delete/'+id,{
          method: 'DELETE'
        })
        const fetchAfterDelete= async () =>{
          const res = await fetch('/status/Pending')
          const json = await res.json()
          setJobs(json);
          setLgtabActive(false);
        }
        fetchAfterDelete();
        
      }
    const LargeTab=()=>{
      return(
          <div className='col-7 ps-4'>
          <div className="card position-fixed" style={{height:'825px',width:'825px'}}>
          <div className='ps-4 pt-4 position-sticky border-bottom shadow-sm' style={{height:'250px'}}>
            <h4 className="pt-1"><b>{detailedJob.jobTitle}</b></h4>
            <div className='py-2'><UrlChecker/><br/>{detailedJob.jobLocation}</div>
            <div className='pt-2 pb-4'>
              <b>Contact:</b><br/>
              Email: {detailedJob.email}<br/>
              <PhnNumChecker/>
            </div>
          </div>
          <div style={{overflow:'auto'}}>
          <div className='row ps-4 pt-4 border-bottom'>
            <h5 className="pt-1"><b>Job Summary</b></h5>
            <div className="col-4 py-3">
            <b>Vacancy: </b>{detailedJob.vacancy}
            </div>
            <div className="col-8 py-3">
            <b>Location: </b>{detailedJob.jobLocation}
            </div>
            <div className="col-4 ps-2 pb-3">
            <b>Salary: </b>{detailedJob.payDetails}
            </div>
            <div className="col-4 ps-2 pb-3">
            <b>Job Type: </b>{detailedJob.jobType}
            </div>
            <div className="col-4 ps-2 pb-3">
            <b>Shift: </b>{detailedJob.jobShift}
            </div>
          </div>
          <div className="card-body p-4">
          <div dangerouslySetInnerHTML={{__html: `${detailedJob.description}`}} />
          </div>
          </div>
          </div>
          </div>
      );
  }
  const smtbclkHandler=(data)=>{
    setLgtabActive(true);
    setDetailedJob(data);
  };
  return (

    <div>
        <div style={{paddingLeft:'250px', paddingRight:'250px'}}>
        <div className='row'>
        <div className="col-6 dropdown pt-3">
        <b className='ps-2'>Show: </b>
        <div className="btn dropdown-toggle ms-2 border border-outline" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {jobShower}</div>
        <div className=" dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" onClick={()=>{
            setJobShower('Active');
            const fetchActiveJobs = async () =>{
              const res = await fetch('/status/Active')
              const json = await res.json()
              setLgtabActive(false);
              setJobs(json);
            }
              fetchActiveJobs();
              setShowCategory("All")
            }}>Active</button>
          <button className="dropdown-item" onClick={()=>{
            setJobShower('Pending');
            const fetchPendingJobs = async () =>{
              const res = await fetch('/status/Pending')
              const json = await res.json()
              setLgtabActive(false);
              setJobs(json);
            }
              fetchPendingJobs();
              setShowCategory("All")
            }}>Pending</button>
        </div>
        </div>
        <div className='col-6 d-flex justify-content-end pt-3 pe-3'>
        <Link to='/addJob'type="button" className="btn btn-primary mb-1">Add Job</Link>
        </div>
        </div>
        <CategoryDisplay/>
        <div className='row d-flex justify-content-between'>
        {jobs&&<SmallTab job={jobs} smtbclkHandler={smtbclkHandler} deleteJob={deleteJob} approveJob={approveJob} access="admin" status={jobShower}/>}
        {lgtabActive&&<LargeTab/>}
        </div>
        </div>
    </div>
  );
}

export default CareerPanel;