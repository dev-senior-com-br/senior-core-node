import { RequestClient } from '../base/RequestClient';
import { HttpMethod } from '../model/HttpMethod';
import { SeniorApi } from '../SeniorApi';
import { RequestReturn } from '../model';

export class Notification extends RequestClient {
  constructor(seniorApi: SeniorApi) {
    super(seniorApi, 'platform', 'notifications');
  }

  notifyUser(
    origin: string,
    kind: string,
    priority: string,
    subject: string,
    content: string,
    notificationClass: string,
    domain: string,
    service: string,
    users: string[]
  ): Promise<RequestReturn> {
    const clientOptions = {
      url: this.getUrlPath('actions/notifyUser'),
      method: HttpMethod.POST,
      data: {
        notificationOrigin: origin,
        notificationKind: kind,
        notificationPriority: priority,
        notificationSubject: subject,
        notificationContent: content,
        notificationClass: notificationClass,
        sourceDomain: domain,
        sourceService: service,
        destinationUsers: users,
      },
      headers: {
        'seniorx.version': 2,
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }
}
