import { RequestClient } from '../base/RequestClient';
import { HttpMethod } from '../model/HttpMethod';
import { SeniorApi } from '../SeniorApi';
import { RequestReturn } from '../model';
import { NotifyUserDto } from '../dto/Notification';

export class Notification extends RequestClient {
  constructor(seniorApi: SeniorApi) {
    super(seniorApi, 'platform', 'notifications');
  }

  notifyUser(dto: NotifyUserDto): Promise<RequestReturn> {
    for (const key in dto) {
      if (!dto[key]) {
        throw new Error(`O atributo "${key}" é obrigatório`);
      }
    }
    const clientOptions = {
      url: this.getUrlPath('actions/notifyUser'),
      method: HttpMethod.POST,
      data: {
        notificationOrigin: dto.origin,
        notificationKind: dto.kind,
        notificationPriority: dto.priority,
        notificationSubject: dto.subject,
        notificationContent: dto.content,
        sourceDomain: dto.domain,
        notificationClass: dto.notificationClass,
        sourceService: dto.service,
        destinationUsers: dto.users,
      },
      headers: {
        'seniorx.version': 2,
        authorization: this.seniorApi.accessToken,
      },
    };

    return this.request(clientOptions);
  }
}
