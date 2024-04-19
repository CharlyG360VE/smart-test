import { IAliment } from "../../domains/aliments-management/interface/aliments.interface";
import { IUser } from "../../domains/user/interface/user.interface";

export interface IJsonData {
    aliments: IAliment[];
    users: IUser[];
}