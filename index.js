const core = require('@actions/core');
const github = require('@actions/github');
let axios = require("axios");


try {
  async function azureAPICalling(){
  //getting and using important credentials
  const accessToken = core.getInput('AzureAccessToken');
  core.setSecret('accessToken');
  let organization = "DevOps-MBU";
  const project = core.getInput('organization');
  //getting and using a file input
  const processId= core.getInput('processId');
  const apiversion= core.getInput('api-version');

 // console.log(file);
  
  //let project = "DemoProject";
  let pipelineId = 78 || null;
  let runId = 971 || null;
  if (accessToken == null || accessToken === "") {
    throw new Error("Please provide an access token");
  } else {
    console.log("token is present!");
  }
  let bodydata=  {
    "name": "Change Request",
    "description": "Change request to track requests for changes :)",
    "color": "f6546a",
    "icon": "icon_airplane",
    "isDisabled": false,
    "inheritsFrom": null
  };
  let url = `https://dev.azure.com/${organization}/_apis/work/processes/${processId}/workitemtypes?api-version=7.1-preview.2`
  const request = await axios({
    url,
    data: bodydata,
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      
      // This!
      Authorization: `Basic ${Buffer.from(`PAT:${accessToken}`).toString(
        "base64"
      )}`,
      
      "X-TFS-FedAuthRedirect": "Suppress",
    },
    
  });
  let responsedata = request.data;
  //Print Names
  console.log(responsedata);
   let arrOfObj=responsedata.value;
console.log(arrOfObj);
   //   arrOfObj.forEach(obj => console.log(obj.name));
//   const jsonFormat = JSON.stringify(responsedata, null, 2);
//   console.log(`Total Pipelines in MBU-Org's ${project}: `)
//   console.log(jsonFormat);

    }
   azureAPICalling(); 

} catch (error) {
  core.setFailed(error.message);
}