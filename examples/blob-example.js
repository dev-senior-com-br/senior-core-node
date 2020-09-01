require('dotenv').config();
const axios = require('axios');
const { join } = require('path');
const fs = require('fs');

const { SeniorApi } = require('../');

const username = process.env.SENIOR_USERNAME;
const password = process.env.PASS;

const blobRequest = {
  areaSecret: 'sdkCore' + username,
  domainName: 'customDomain',
  serviceName: 'customService',
  fileName: 'blob_file.txt',
  targetObjectId: 'blob_file.txt'
}

const api = new SeniorApi();

api.authentication.login(username, password).then(async json => {
  if(json.body.resetPasswordInfo) {
    throw new Error('Usuário informado inválido para os testes, é necessário fazer o login na plataforma ao menos uma vez após a sua criação para realizar a troca da senha.');
  }
  api.accessToken = JSON.parse(json.body.jsonToken).access_token;

  try {
    const { data: blobDetails } = await api.blob.uploadFile(blobRequest);
    console.log(blobDetails)
    let data = fs.readFileSync(join(__dirname, 'blob-file.txt'));
    await axios.put(blobDetails.location.uri, data, {
      headers: {
        'Content-type': 'text/plain'
      }
    });
    const commitFileInput = {
      areaSecret: blobRequest.areaSecret,
      domainName: blobDetails.domainName,
      fileName: blobDetails.fileName,
      release: true,
      serviceName: blobDetails.serviceName,
      version: blobDetails.version,
      targetObject: blobDetails.targetObjectId,
    }
    const { data: commitFileOutput } = await api.blob.commitFile(commitFileInput);
    console.log(commitFileOutput);
  } catch (error) {
    console.error('Erro ao tentar fazer upload via blob_service', error.response.data)
  }

  try {
    const { blobDetails, commitFileOutput } = await api.blob.uploadAndCommitFile(blobRequest);
    console.log(blobDetails);
    console.log(commitFileOutput);
  } catch (error) {
    console.error('Erro ao tentar fazer upload via blob_service', error.response.data)
  }

  if (api.accessToken) {
    // Efetuando logout
    await api.authentication.logout().catch(error => {
      console.error('Erro na tentativa de efetuar logout: ', error.response.data);
    });
  }
}).catch(error => {
  console.error('Erro na tentativa de efetuar login: ', error.response.data);
});