import { PlatformCategory } from "../enums/platform-category.enum";

export interface IPlatform{
    id:string | number,
    abbreviation?:string,
    name?:string,
    category?:PlatformCategory,
    platform_family?: string | number
}