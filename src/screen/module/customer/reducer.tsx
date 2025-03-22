import { Dispatch, PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit'
import { CustomerItem } from "./da";
import { AccountController, Util } from 'wini-web-components';


interface CustomerSimpleResponse {
    data?: CustomerItem,
    onLoading?: boolean,
    type?: string
}

const initState: CustomerSimpleResponse = {
    data: undefined,
    onLoading: false
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState: initState,
    reducers: {
        handleActions: (state, action: PayloadAction<any>) => {
            switch (action.payload.type) {
                case 'GETINFOR':
                    state.data = action.payload.data
                    break;
                default:
                    break;
            }
            state.onLoading = false
        },
        onFetching: (state) => {
            state.onLoading = true
        },
    },
})

const { handleActions, onFetching } = customerSlice.actions

export default customerSlice.reducer


export class CustomerActions {
    static account = new AccountController();

    static getInfor = async (dispatch: Dispatch<UnknownAction>) => {
        dispatch(onFetching())
        const res = await this.account.getInfor();
        // this.account.login({})
        if (res.code === 200) {
            dispatch(handleActions({
                type: 'GETINFOR',
                data: res.data,
            }))
        }
        
    }

    // static login = async (props: { Username: string, Password: string }) => {
    //     const res = await BaseDA.post(ConfigApi.url + 'wini/login', {
    //         headers: { module: 'Customer' },
    //         body: props
    //     })
    //     return res
    // }

    // static loginGoogle = async (code: string) => {
    //     const res = await BaseDA.post(ConfigApi.url + 'wini/login', {
    //         headers: { module: 'Customer' },
    //         body: { type: "google", token: code, ggClientId: ConfigApi.ggClientId }
    //     })
    //     return res
    // }

    static logout = () => {
        Util.clearCookie()
        window.location.replace("/login")
    }
}