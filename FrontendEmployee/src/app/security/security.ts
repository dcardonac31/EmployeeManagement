export interface userCredential{
    email: string;
    password: string;
}

export interface authenticationResponse{
    token: string;
    expiration: Date;
}