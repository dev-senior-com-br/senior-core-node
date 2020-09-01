import { RequestClient } from '../base/RequestClient';
import { SeniorApi } from '../SeniorApi';
import { BlobRequest, CommitFileInput, BlobDetails, CommitFileOutput, UploadFileAndCommitOutput } from '../dto/Blob';
import { HttpMethod, RequestReturn } from '../model';

export class Blob extends RequestClient {
  constructor(seniorApi: SeniorApi) {
    super(seniorApi, 'platform', 'blob_service');
  }

  uploadFile(blobRequest: BlobRequest): Promise<RequestReturn<BlobDetails>> {
    const clientOptions = {
      url: this.getUrlPath('actions/uploadFile'),
      method: HttpMethod.POST,
      data: blobRequest,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  commitFile(commitFileInput: CommitFileInput): Promise<RequestReturn<CommitFileOutput>> {
    const clientOptions = {
      url: this.getUrlPath('actions/commitFile'),
      method: HttpMethod.POST,
      data: commitFileInput,
      headers: {
        authorization: this.seniorApi.accessToken,
      },
    };
    return this.request(clientOptions);
  }

  async uploadAndCommitFile(blobRequest: BlobRequest, file: File): Promise<UploadFileAndCommitOutput> {
    const { data: blobDetails } = await this.uploadFile(blobRequest);
    blobDetails.areaSecret = blobRequest.areaSecret;
    const clientOptions = {
      url: blobDetails.location.uri,
      method: HttpMethod.PUT,
      data: file,
    };
    await this.request(clientOptions);
    const commitFileInput: CommitFileInput = {
      areaSecret: blobDetails.areaSecret,
      domainName: blobDetails.domainName,
      serviceName: blobDetails.serviceName,
      targetObject: blobDetails.targetObjectId,
      fileName: blobDetails.fileName,
      version: blobDetails.version,
      release: true,
    };
    const { data: commitFileOutput } = await this.commitFile(commitFileInput);
    return {
      blobDetails,
      commitFileOutput,
    };
  }
}
