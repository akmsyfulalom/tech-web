const addJobSchema=require('../schema');

const allJob=async (req,res)=>{
    const jobs=await addJobSchema.find({});
    res.send(jobs);
}

const addJob=async (req,res)=>{
    const {
        companyName,
        email,
        phoneNumber,
        url,
        jobTitle,
        category,
        jobLocation,
        vacancy,
        jobShift,
        jobType,
        payDetails,
        description,
        status
    }=req.body
    try{
        const response =await addJobSchema.create({companyName,email,phoneNumber,url,jobTitle,category,jobLocation,vacancy,jobShift,jobType,payDetails,description,status})
        res.json(response)
    }
    catch(err)
    {
        res.json(err);
    }
}

const findByCategory=async (req,res)=>{
    const jobs = await addJobSchema.find({category:`${req.params.category}`});
    res.json(jobs);
}


const statusAndCategory = async (req,res)=>{
    // if(!req.params.catagory)
    // {
    //     const response = await addJobSchema.find({status:req.params.status})
    //     res.json(response);
    // }
    // else
    // {
        const response = await addJobSchema.find({status:req.params.status,category:req.params.category})
        res.json(response);
    //}

}
const status = async (req,res)=>{
    const response = await addJobSchema.find({status:req.params.status})
    res.json(response);
}
const updateStatus = async (req,res)=>{
    //const {status}=req.body
    const response = await addJobSchema.findOneAndUpdate({_id:req.params.id},
        {
        status:"Active"
        })
    res.json(response);
}
const deleteJob = async (req,res)=>{
    const response = await addJobSchema.deleteOne({_id:req.params.id})
    res.json(response);
}
module.exports={
    allJob,
    addJob,
    findByCategory,
    status,
    statusAndCategory,
    updateStatus,
    deleteJob
}