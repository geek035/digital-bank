export interface IRegistrationRequest {
    login: string,
    email: string,
    lastName: string,
    firstName: string,
    middleName: string,
    sex: 'Male' | 'Female',
    birthdate: string,
    phoneNumber: string,
    address: string,
    password: string,
}