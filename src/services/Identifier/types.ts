export interface IdentifierType {
  identifier: string;
}

export interface VerifyOtpType extends IdentifierType {
  id?: string;
  otp: string;
}

export interface Iidentifier {
  identifier: string;
}

export interface IverifyOtp extends IdentifierType {
  id?: string;
  otp: string;
}
