export interface User {
    email : string;
    password : string;
    username : string;
    isVerified? : boolean,
    isAdmin? : boolean,
    forgotPasswordToken?: string,
    forgotPasswordTokenExpiry?: string,
    verifyToken?: string,
    verifyTokenExpiry?: string, 
}