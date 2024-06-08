export interface Ilogin {
  identifier: string;
  password: string;
}
export interface IgetUsers {}

export interface IsignUp extends Ilogin {
  fullName?: string;
}

export interface IcreateProfile {
  userId: string;
  password: string;
  fullName: string;
}
