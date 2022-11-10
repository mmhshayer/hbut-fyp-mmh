// import { Lang, Status } from '../../shared';
// import { MemberType, RoleAtCompany, UserType } from './user.enum';

// export interface UserCompanyAssociation {
//   _id: string;
//   userId: string;
//   companyId: string;
//   role: RoleAtCompany;
//   status: Status;
// }

export interface User {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}

// export interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   status: Status;
//   userType: UserType;
//   companyRoles: UserCompanyAssociation[];
//   title: string;
//   preferredLanguage: Lang;
// }

// export interface Company {
//   _id: string;
//   companyName: string;
//   hpsaId: string;
//   status: Status;
//   userIds: string[];
//   PO: boolean;
//   doingBusinessAs: string;
//   memberType: MemberType;
//   addressOne: string;
//   addressTwo: string;
//   city: string;
//   province: string;
//   zipCode: string;
//   country: string;
//   website: string;
//   emailAddress: string;
//   pageLink: string;
//   preferredLanguage: Lang;
//   membershipAgreement?: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface UserReducerStateType {
  user?: User;
  // companies?: Company[];
  // currentCompany?: Company;
  // showCompanyInfoPopup?: boolean;
}

export interface UserReducerActionType {
  action: string;
  // payload?: UserReducerStateType & { company?: Company };
  payload?: UserReducerStateType;
}
