import { Services } from './entity';

export const SERVICES_MAPPER_TEXT: Record<Services, string> = {
  [Services.doctorHomeVisit]: 'Doctor home visit',
  [Services.bbq]: 'BBQ',
  [Services.cleaning]: 'Cleaning',
  [Services.transfer]: 'Transfer',
  [Services.feedback]: 'Feedback',
  [Services.certificatesAndDocuments]: 'Certificates and Documents',
  [Services.oneTimePass]: 'One time pass',
  [Services.sportArea]: 'Sport Area',
  [Services.sos]: 'SOS',
};
