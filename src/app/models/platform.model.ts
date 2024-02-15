import { PlatformCategory } from "../shared/enums/platform-category.enum";

export interface PlatformModel{
    id:string | number,
    abbreviation?:string,
    name?:string,
    category?:PlatformCategory,
    platform_family?: string | number
}