const makeFormData = async body=>{
    let formData = new FormData();
    const {file, ...data} = body
    if(file){
        const {uri,name='image',type='image/jpg'} = file;
        if(uri)
        formData.append('file', { uri, name, type });
        else throw {code:424,message:"Please provide uri parameter in file"}
    }
    await Promise.all([Object.keys(data).forEach(key=> formData.append(key,typeof data[key] === "string"?data[key]:JSON.stringify(data[key])))])
    return formData
}



/**
 * 
 * @param {params} : Object
 *  url: string (required)= "http://your.api.url.com/route"
 *  body:object = {name:"test",password:"****"}
 *  auth:object = {id:"5aer3d86a5s4d6",token:"@$%$ATDFAIU%RSDIYTAKHSGDFKHGfkhGFKY#TFKQYGTwdkhg", language:"en"}
 *  contentType:string = "application/json" || "multipart" (*in case of multipart - there must be a key as `file` present in body like - file: {url:"image_url",name:"image.jpg", type:"image/jpeg"} )
 *  method:string = "POST" || "GET" (default "GET")
 *
 *  @examples - 
 *  {url:"http://api.url.com/path",body:{email:"test@test.com",password:"****"},method:"POST"}
 *  {url:"http://api.url.com/path",contentType:"multipart", method:"POST", body:{email:"test@test.com", firstName:"test",password:"****",file:{uri:"image/path/",name:"profile_pic",type:"image/jpeg"}},method:"POST"}
 * 
 *  @return :Promise = {response object from server}
 **/

export const Request = async ({url, body={}, auth={}, contentType="application/json", method="GET"})=>{
    try {
        const {id='', token='', language='en'} = auth;
        let headers = { "Content-Type": contentType, language, id, token};
          if (method === "GET"){
            const response = await fetch(url, { method, headers})
            return response.json()
          }
          if (method === "POST"){
            if(contentType === 'multipart'){
                let formdata = await makeFormData(body);
                const response = await fetch(url, { method, headers, body:formdata})
                return response.json()
            }else{
                const response = await fetch(url, { method, headers, body:JSON.stringify(body)})
                return response.json()
            }
          }  
    } catch (error) {
        return new Promise((res,rej) => {
            rej(error)
        });
    }
}