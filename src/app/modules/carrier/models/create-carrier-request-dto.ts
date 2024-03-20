export interface CreateCarrierRequestDto {
    identityNumber:string,
    firstName:string,
    middleName?:string,
    lastName:string,
    birthDate:Date,
    createdById:number,
    email:string,
    phone:string

}
