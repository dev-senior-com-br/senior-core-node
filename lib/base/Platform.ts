import { ENVIRONMENTS } from '../Environments';

const REGEX_VALID_URL =
  '^https?:\\/\\/' + // protocol needed
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))' + // domain name or ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*$'; // port and path

export class Platform {
  #anonymousUrl: string;
  #restUrl: string;
  constructor(envOrUrl: string) {
    let baseUrl: string = null;
    if (ENVIRONMENTS[envOrUrl]) {
      baseUrl = ENVIRONMENTS[envOrUrl];
    } else if (validURI(envOrUrl)) {
      baseUrl = envOrUrl;
    } else {
      throw new Error(
        `Invalid environment or URL: '${envOrUrl}'.` +
          +` If it is a URL please check if it matches the regex: ${REGEX_VALID_URL}`
      );
    }
    if (baseUrl === ENVIRONMENTS.PROD) {
      this.#anonymousUrl = `${baseUrl}/%s/%s/anonymous/%s`;
      this.#restUrl = `${baseUrl}/%s/%s/%s`;
    }
    this.#anonymousUrl = `${baseUrl}/anonymous/%s/%s/%s`;
    this.#restUrl = `${baseUrl}/%s/%s/%s`;
  }

  get anonymousUrl(): string {
    return this.#anonymousUrl;
  }

  get restUrl(): string {
    return this.#restUrl;
  }

  getUrlPath(baseUrl: string, ...args: string[]): string {
    return baseUrl.replace(/%s/g, match => {
      const arg = args.shift();
      return arg !== undefined ? arg : match;
    });
  }
}

function validURI(uri: string) {
  const pattern = new RegExp(REGEX_VALID_URL, 'i');
  return pattern.test(uri);
}
