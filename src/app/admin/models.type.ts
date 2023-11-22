export interface userModel {
  "id"?: number,
  "username"?: string,
  "password"?: string,
}
export interface loginResponseModel {
  "token": string;
}
export interface productModel {
  "title"?: string;
  "color"?: string;
  "price"?: string;
  "image"?: string | HTMLImageElement;
  "id"?: number
}
export interface resetPasswordResponseModel {
  "exists": boolean,
  "message": string

}
export interface resetPasswordModel {

  "username": string,
  "resetToken": string,
  "newPassword": string,
  "message"?: string;

}
