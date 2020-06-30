import {RequestClient} from '../base/RequestClient';
import { HttpMethod } from '../model/HttpMethod';
import {SeniorApi} from '../SeniorApi';

export class Notification extends RequestClient {

    constructor(seniorApi: SeniorApi) {
      super(seniorApi, "platform", "notifications")
    }

    notifyUser = (origin: string, kind: string, priority: string, subject: string, content: string, domain: string, service: string, users: string[]) => {
        const clientOptions = {
          url: this.getUrlPath("actions/notifyUser"),
          method: HttpMethod.POST,
          data: {
            "notificationOrigin" : origin,
            "notificationKind" : kind,
            "notificationPriority" : priority,
            "notificationSubject" : subject,
            "notificationContent" : content,
            "sourceDomain" : domain,
            "sourceService" : service,
            "destinationUsers" : users
          },
          headers: {
            "seniorx.version": 2,
            authorization: this.seniorApi.accessToken
          },          
        };
    
        return this.request(clientOptions);
    };    

}