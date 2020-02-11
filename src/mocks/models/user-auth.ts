
interface ProviderData   {
  uid: string;
  displayName: string |null;
  photoURL: string |null;
  email: string |null;
  phoneNumber: number |null;
  providerId: string;
}
interface StsTokenManager {
  apiKey: string;
  refreshToken: string;
  accessToken:string;
  expirationTime: number
};
interface AdditionalUserInfo { 
  providerId: string; 
  isNewUser: boolean 
}

interface InterUser {
  uid: string;
  displayName: string |null;
  photoURL: string |null;
  email: string;
  emailVerified: boolean;
  phoneNumber: string |null;
  isAnonymous: boolean;
  tenantId: string |null;
  providerData: ProviderData[];
  apiKey: string ;
  appName: string;
  authDomain: string;
  stsTokenManager: StsTokenManager;
  redirectEventId: null;
  lastLoginAt: string ;
  createdAt: string;
}

export interface UserAuth {
  user: InterUser;
  credential: string | null;
  additionalUserInfo: AdditionalUserInfo,
  operationType: string
};
