import { IGetStorage } from "@/data/protocols/cache";
import { IHttpGetClient, IHttpGetParams, IHttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements IHttpGetClient{

    constructor(
        private readonly getStorage: IGetStorage,
        private readonly httpGetClient: IHttpGetClient
        ){}

    async get(params: IHttpGetParams): Promise<IHttpResponse>{
        const account = this.getStorage.get('account')
        if(account?.accessToken){
            Object.assign(params, {
                headers: Object.assign(params.headers || {}, {
                    'x-access-token': account.accessToken
                })
            })
        }
        await this.httpGetClient.get(params)
        return null
    }

}