export const defaultContextState = {
    Token: null,
    TokenExprired : null,
    User:{
        UserId: null,
        Email: null,
        FullName: null,
        PhoneNumber: null,
        UserName: null
    },
    Context: {}
} 

export default {
    ...defaultContextState,
}