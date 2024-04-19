import { eRole } from "../../../_core/_enums/role.enum";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: eRole
}

export interface IPayloadLogin {
    email: string;
    password: string
}
