import { IGetStorage } from "@/data/protocols/cache";
import { IHttpGetClient, IHttpGetParams, IHttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements IHttpGetClient{

    constructor(private readonly getStorage: IGetStorage){}

    async get(params: IHttpGetParams): Promise<IHttpResponse>{
        this.getStorage.get('account')
        return null
    }

}