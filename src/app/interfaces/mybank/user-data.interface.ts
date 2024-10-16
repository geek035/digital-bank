export interface IUserData {
    login: string,
    email: string,
    lastName: string,
    firstName: string,
    middleName: string,
    sex: unknown | 'Male' | 'Female',
    birthdate: string,
    phoneNumber: string,
    address: string,
    isMustChangePassword: boolean
}