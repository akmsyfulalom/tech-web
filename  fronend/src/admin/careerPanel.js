import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SmallTab from '../career/smallTab';


const CareerPanel=()=>{

  const {category}=useParams();
  const [jobs,setJobs]=useState();
  const [detailedJob,setDetailedJob]=useState("");
  const [lgtabActive,setLgtabActive]=useState(false);
  const [jobShower,setJobShower]=useState("Active");



  useEffect(()=>{
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
      const fetchByCategory= async () =>{
        const res = await fetch(`/jobs/categories/${category}`)
        const json = await res.json()
        setJobs(json);
      }
      fetchByCategory();
    }

    },[]);
    const CategoryDisplay=()=>{
      if(category!=null)
      return <><b className='ps-2'>Category: </b>{category}</>
      else
      return <><b className='ps-2'>Category: </b> All</>
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
        <div class="btn dropdown-toggle ms-2 border border-outline" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
            }}>Active</button>
          <button className="dropdown-item" onClick={()=>{
            setJobShower('Pending');
            const fetchActiveJobs = async () =>{
              const res = await fetch('/status/Pending')
              const json = await res.json()
              setLgtabActive(false);
              setJobs(json);
            }
              fetchActiveJobs();
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