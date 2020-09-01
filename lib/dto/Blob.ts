export interface BlobRequest {
  /**
   * Uma string com o nome do domínio
   */
  domainName: string;
  /**
   * Nome do serviço que esta enviando o arquivo
   */
  serviceName: string;
  /**
   * Nome da pasta ou área de armazenamento
   */
  areaSecret: string;
  /**
   * Identificador do arquivo no serviço onde é utilizado
   */
  targetObjectId: string;
  /**
   * Nome do arquivo
   */
  fileName: string;
}

export interface CommitFileInput {
  domainName: string;
  serviceName: string;
  targetObject: string;
  version: string;
  areaSecret: string;
  release: boolean;
  fileName: string;
  defaultStyle?: string;
  styles?: string[];
  extractMetadata?: boolean;
  cacheTimeToExpireInMonths?: number;
}

export interface BlobDetails {
  /**
   * Nome do domínio para solicitar a operação
   */
  domainName: string;
  /**
   * Nome do serviço para solicitar a operação
   */
  serviceName: string;
  /**
   * Identifica exclusivamente o objeto de destino em seu serviço
   */
  targetObjectId: string;
  /**
   * Se esta for uma cópia do blob real, qual versão ele realmente está?
   */
  version: string;
  /**
   * Um token secreto necessário para acessar um blob protegido
   */
  token: string;
  /**
   * O local onde o arquivo reside ou deveria residir
   */
  location: { uri: string };
  /**
   * O nome real do arquivo permanente
   */
  fileName: string;

  areaSecret: string;
}

export interface CommitFileOutput {
  domainName: string;
  serviceName: string;
  targetObject: string;
  location: { uri: string };

  // Metadata
  name: string;
  size: number;
  type: FileType;
  title: string;
  contentType: string;
}

export interface UploadFileAndCommitOutput {
  blobDetails: BlobDetails;
  commitFileOutput: CommitFileOutput;
}

export enum FileType {
  Unknown = 'Unknown',
  PDF = 'PDF',
  MsWord = 'MsWord',
  MsExcel = 'MsExcel',
  MsPowerPoint = 'MsPowerPoint',
  MsVisio = 'MsVisio',
  MsOutlook = 'MsOutlook',
  MsPublisher = 'MsPublisher',
  OoxmlWord = 'OoxmlWord',
  OoxmlExcel = 'OoxmlExcel',
  OoxmlPowerPoint = 'OoxmlPowerPoint',
  OoxmlVisio = 'OoxmlVisio',
  PlainText = 'PlainText',
  Image = 'Image',
  Video = 'Video',
  Audio = 'Audio',
}
