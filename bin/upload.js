const { jar } = require('request');
const WebRequest = require('web-request');
const core = require('@actions/core');
const fs = require('fs');
const packageJson = require("../package.json");


(async () => {
  let cookiejar = jar();

  try {
    const loginform = await WebRequest.get("https://factorio.com/login?mods=1&next=%2Ftrending",{jar:cookiejar});
    const logintoken = ((loginform.content.match(/<input [^>]+"csrf_token"[^>]+>/)||[])[0].match(/value="([^"]*)"/)||[])[1];

    const username = core.getInput("factorio_mod_portal_username", {required: true});
    const password = core.getInput("factorio_mod_portal_password", {required: true});

    console.log(`Logging in to Mod Portal as '${username}'\r\n`);

    const loginresult = await WebRequest.post("https://factorio.com/login",{jar:cookiejar, throwResponseError: true,
      headers:{
        referer: "https://factorio.com/login?mods=1&next=%2Ftrending"
      },
      form:{
        csrf_token: logintoken,
        username_or_email: username,
        password: password,
        next_url: "/trending",
        next_mods: false
      }
    });

    const loginerr = loginresult.content.match(/<ul class="flashes">[\s\n]*<li>(.*)<\/li>/);
    if (loginerr) {// noinspection ExceptionCaughtLocallyJS
      throw new Error(loginerr[1]);}

  } catch (error) {
    console.error(`Failed to log in to Mod Portal: \r\n${error.toString()}\r\n`);
    return false;
  }

  let uploadtoken;
  try {
    const uploadform = await WebRequest.get(`https://mods.factorio.com/mod/${packageJson.name}/downloads/edit`,{jar:cookiejar, throwResponseError: true});
    uploadtoken = uploadform.content.match(/\n\s*token:\s*'([^']*)'/)[1];
  } catch (error) {
    console.error("Failed to get upload token from Mod Portal: " + error.toString());
    return false;
  }

  const asset_path = core.getInput("asset_path", {required: true});
  const asset_name = core.getInput("asset_name", {required: true});

  let uploadresult;
  try {
    uploadresult = await WebRequest.post(`https://direct.mods-data.factorio.com/upload/mod/${uploadtoken}`, {
      jar:cookiejar,
      throwResponseError: true,
      formData:{
      file:{
        value:  fs.createReadStream(asset_path),
        options: {
          filename: asset_name,
          contentType: 'application/x-zip-compressed'
        }
      }
    }});
  } catch (error) {
    console.error("Failed to upload zip to Mod Portal: " + error.toString());
    return false;
  }

  let uploadresultjson = JSON.parse(uploadresult.content);

  try {
    const postresult = await WebRequest.post(`https://mods.factorio.com/mod/${packageJson.name}/downloads/edit`, {
      jar:cookiejar,
      throwResponseError: true,
      form:{
        file:undefined,
        info_json:uploadresultjson.info,
        changelog:uploadresultjson.changelog,
        filename:uploadresultjson.filename,
        file_size: fs.statSync(asset_path).size ,
        thumbnail:uploadresultjson.thumbnail
      }
    });

    if (postresult.statusCode === 302) {
      console.log(`Published ${asset_name}`);
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw postresult.content.match(/category:\s*'error',\s*\n\s*message:\s*'([^']*)'/)[1];
    }
  } catch (error) {
    console.error("Failed to post update to Mod Portal: " + error.toString());
    return false;
  }
})();