import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SmallTab from './smallTab';
//import './App.css';


const JobResult=()=>{
  const {category}=useParams();
  const [jobs,setJobs]=useState();
  const [detailedJob,setDetailedJob]=useState("");
  const [lgtabActive,setLgtabActive]=useState(false);

  useEffect(()=>{
    if(category==null)
    {
      const fetchData= async () =>{
        const res = await fetch('/db/')
        const json = await res.json()
        setJobs(json);
        console.log(json);
      }
      fetchData();
    }
    else
    {
      const fetchData= async () =>{

        const res = await fetch(`/status/Active/${category}`)
        // const res = await fetch("/db")
        const json = await res.json()
        console.log(json);
        setJobs(json);
    }
    fetchData();
    }

  //console.log(us.token);
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
        return <a href={detailedJob.url} target="_blank" rel="noreferrer">{detailedJob.companyName}</a>
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
        <div className='d-flex justify-content-end pt-3 pe-3'>
        <Link to='/addJob'type="button" className="btn btn-primary mb-1">Add Job</Link>
        </div>
        <CategoryDisplay/>
        <div className='row d-flex justify-content-between'>
        {jobs&&<SmallTab job={jobs} smtbclkHandler={smtbclkHandler}/>}
        {lgtabActive&&<LargeTab/>}
        </div>
        </div>
    </div>
  );
}

export default JobResult;