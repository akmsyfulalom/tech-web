import { useState, useContext } from "react";
import { AuthContext } from "./context/authContext";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from "react-router";


const styles = {
  companyDetails: {
    width: '800px', backgroundColor: 'white', borderRadius: '20px', marginTop: '150px'
  },
  jobDetails: {
    height: '75px', width: '800px', backgroundColor: 'white', borderRadius: "20px", marginTop: '100px', marginBottom: '25px'
  },
  inputField: {
    width: '800px', backgroundColor: 'white', borderRadius: "20px", marginTop: '15px', marginBottom: '25px'
  }
}
const AddJob = () => {
  const context = useContext(AuthContext);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [companyDetails, setCompanyDetails] = useState(true);
  const [jobDetails, setJobDetails] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('Accounting&Finance');
  const [jobLocation, setJobLocation] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [jobShift, setJobShift] = useState('8 hours shift');
  const [payCurrency, setPayCurrency] = useState('BDT');
  const [pay, setPay] = useState('');
  const [payRate, setPayRate] = useState('per month');
  const [buttonLock, setButtonLock] = useState(false);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const Navigate = useNavigate();
  const status = "Pending";
  let payDetails;
  const [payDetailsGenerator, setPayDetailsGenerator] = useState();
  let description;

  const handleSubmission = async (e) => {
    e.preventDefault();
    setButtonLock(true);
    description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (isNegotiable) {
      payDetails = 'Negotiable'
    }
    else {
      payDetails = payCurrency + " " + pay + " " + payRate;
    }
    const formData = { companyName, phoneNumber, email, url, jobTitle, category, jobLocation, vacancy, jobType, jobShift, payDetails, description, status }
    const request = await fetch('/jobs/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await request.json();
    console.log(json);
    setButtonLock(true);
    setTimeout(() => {
      setButtonLock(false);
      Navigate("/");
    }, 2000)
  }
  return (
    <div style={{ backgroundColor: '#f1f1f1', height: '100vh', paddingBottom: '25px', fontFamily: 'sans-serif', overflow: 'scroll' }}>
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmission}>
          {companyDetails &&
            <div className='container d-flex justify-content-center' style={styles.companyDetails}>
              <div className='row d-flex justify-content-center'>
                <h2 className="col-10" style={{ paddingTop: '70px' }}><b>Company Details</b></h2>
                <div className="form-group col-10" style={{ paddingTop: '30px' }}>
                  <b style={{ fontSize: '18px' }}>Your company's name</b>
                  <input
                    type="text"
                    value={companyName}
                    style={{ height: '45px', fontSize: '16px' }}
                    onChange={(e) => { setCompanyName(e.target.value) }}
                    className="form-control mt-2 border-dark" />
                </div>
                <div className="form-group col-10" style={{ paddingTop: '30px' }}>
                  <b style={{ fontSize: '18px' }}>Phone Number</b>
                  <input
                    type="tel"
                    value={phoneNumber}
                    style={{ height: '45px', fontSize: '16px' }}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="form-control mt-2 border-dark" />
                </div>
                <div className="form-group col-10" style={{ paddingTop: '30px' }}>
                  <b style={{ fontSize: '18px' }}>Email</b>
                  <input
                    type="email"
                    value={email}
                    style={{ height: '45px', fontSize: '16px' }}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control mt-2 border-dark" />
                </div>
                <div className="form-group col-10" style={{ paddingTop: '30px', fontSize: '18px' }}>
                  <b>Website URL</b>
                  <input
                    type="text"
                    value={url}
                    style={{ height: '45px', fontSize: '16px' }}
                    onChange={(e) => setUrl(e.target.value)}
                    className="form-control mt-2 border-dark mb-5" />
                </div>
                <div className="d-flex justify-content-end pb-5" style={{ paddingTop: '20px', paddingRight: '80px' }}>
                  <button className="btn btn-outline-primary px-5 py-2" onClick={() => { setCompanyDetails(false); setJobDetails(true) }}><b>Next</b></button>
                </div>
              </div>
            </div>
          }
          {jobDetails &&
            <div className='container d-flex justify-content-center' style={{ width: '75px' }}>
              <div className='row d-flex justify-content-center'>
                <h2 className='col-10 d-flex align-items-center p-5' style={styles.jobDetails}><b>Job Details</b></h2>
                <div className="form-group col-10 p-5" style={styles.inputField}>
                  <b style={{ fontSize: '18px', paddingLeft: '5px' }}>Job title</b>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="form-control mt-2 border-dark"
                    style={{ height: '45px', fontSize: '16px' }}>
                  </input>
                </div>
                <div className="form-group col-10 p-5" style={styles.inputField}>
                  <b style={{ fontSize: '18px', paddingLeft: '5px' }}>Which category best describes this job? </b>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='ps-2'
                    style={{ height: '50px', width: '700px', borderRadius: '10px', fontSize: '18px', marginTop: '10px' }}>
                    <option value="Acounting&Finance" >Acounting/Finance</option>
                    <option value="Engineer&Architects" >Engineer/Architects</option>
                    <option value="IT&Telecommunication" >IT & Telecommunication</option>
                    <option value="Marketing&Sales" >Marketing/Sales</option>
                    <option value="Hospitality&Travel&Tourism" >Hospitality/Travel/Tourism</option>
                  </select>
                </div>
                <div className="form-group col-10 p-5" style={styles.inputField}>
                  <b style={{ fontSize: '18px', paddingLeft: '5px' }}>Job location</b>
                  <input
                    type="text"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="form-control mt-2 border-dark"
                    style={{ height: '45px', fontSize: '16px' }}>
                  </input>
                </div>
                <div className="form-group col-10 p-5" style={styles.inputField}>
                  <b style={{ fontSize: '18px', paddingLeft: '5px' }}>How many people do you want to hire for this opening?</b>
                  <input
                    type="number"
                    value={vacancy}
                    onChange={(e) => setVacancy(e.target.value)}
                    className="form-control mt-2 border-dark"
                    style={{ height: '45px', fontSize: '16px' }}>
                  </input>
                </div>
                <div className="form-group col-10 p-5" style={styles.inputField}>
                  <b style={{ fontSize: '18px', paddingLeft: '5px' }}>What is the job type? </b>
                  <select
                    type="text"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className='ps-2'
                    style={{ height: '50px', width: '700px', borderRadius: '10px', fontSize: '18px', marginTop: '10px' }}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
                <div className="form-group col-10 p-5" style={styles.inputField}>
                  <b style={{ fontSize: '18px', paddingLeft: '5px' }}>What is the schedule for this job? </b>
                  <select
                    value={jobShift}
                    onChange={(e) => setJobShift(e.target.value)}
                    className='ps-2'
                    style={{ height: '50px', width: '700px', borderRadius: '10px', fontSize: '18px', marginTop: '10px' }}>
                    <option value="4 hours shift" >4 hours shift</option>
                    <option value="8 hours shift" >8 hours shift</option>
                    <option value="10 hours shift" >10 hours shift</option>
                    <option value="12 hours shift" >12 hours shift</option>
                    <option value="Day shift" >Day shift</option>
                    <option value="Night shift" >Night shift</option>
                  </select>
                </div>
                <div className="row col-10 p-5" style={styles.inputField}>
                  <b style={{ fontSize: '18px', paddingLeft: '5px' }}>What is the pay?</b>
                  {!isNegotiable && <div className="row">
                    <div className="input-group d-flex align-items-end" style={{ width: '375px' }}>
                      <div className="input-group-prepend">
                        <select
                          value={payCurrency}
                          onChange={(e) => setPayCurrency(e.target.value)}
                          className='ps-2'
                          style={{ height: '45px', width: '75px' }}>
                          <option value="USD">USD</option>
                          <option value="BDT">BDT</option>
                        </select>
                      </div>
                      <input
                        type="number"
                        value={pay}
                        onChange={(e) => { setPay(e.target.value); setPayDetailsGenerator(payCurrency + " " + pay + " " + payRate) }}
                        className="form-control border-dark"
                        style={{ height: '45px', fontSize: '16px' }}>
                      </input>
                    </div>
                    <div className='col-5 ps-5'>
                      <label className='col-5 ms-2' style={{ fontSize: '18px' }}>Rate</label>
                      <select
                        value={payRate}
                        onChange={e => setPayRate(e.target.value)}
                        className='col-5 ps-2'
                        style={{ height: '45px', width: '150px', borderRadius: '10px', fontSize: '18px' }}>
                        <option value="per hour">per hour</option>
                        <option value="per day">per day</option>
                        <option value="per month">per month</option>
                      </select>
                    </div>
                  </div>}
                  <div className="form-group pt-3" style={{ fontSize: '18px' }}>
                    <input type="checkbox" value={isNegotiable} onChange={(e) => { setIsNegotiable(e.target.checked); console.log(isNegotiable) }}></input>
                    <label className='ps-2' >Negotiable</label>
                  </div>
                </div>
                <div className="form-group col-10 p-5" style={styles.inputField}>
                  <b style={{ fontSize: '18px', paddingLeft: '5px' }}>Job descripiton</b>
                  <div className="mt-3" style={{ height: '500px' }}>
                    <Editor
                      placeholder='Describe the responsibilities, work experience, skills or education for this job'
                      toolbar={{
                        style: { position: 'fixed' },
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list'],
                        inline: { options: ['bold', 'italic', 'underline'] },
                        blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'] },
                        fontSize: { options: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                      }}
                      editorStyle={{ height: '450px' }}
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                    //onChange={()=>setDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                    />
                  </div>
                </div>
                <div className="row py-2" style={{ width: '800px', backgroundColor: 'white', marginTop: '15px', marginBottom: '25px' }}>
                  <div className="col-6 py-3" style={{ paddingLeft: '5px' }}>
                    <button className="btn btn-outline-primary px-4 py-2" onClick={() => { setCompanyDetails(true); setJobDetails(false) }}><b>Previous</b></button>
                  </div>
                  <div className="col-6 py-3 d-flex justify-content-end" style={{ paddingRight: '5px' }}>
                    {!buttonLock && <button
                      type='submit'
                      className="btn btn-outline-primary px-4 py-2"><b>Confirm</b></button>}
                    {buttonLock && <button
                      disabled
                      className="btn btn-outline-primary px-4 py-2"><b>Submitting</b></button>}
                  </div>
                </div>
                {buttonLock && <div className="alert alert-success mb-3" role="alert">
                  Job is submitted and waiting for admin approval
                </div>
                }
              </div>
            </div>
          }
        </form>
      </div>
    </div>
  )
}
export default AddJob;