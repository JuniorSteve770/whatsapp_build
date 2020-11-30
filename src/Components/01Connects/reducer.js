export const initialState = {
    user: null,
};
// Above here is the initialstate with user not yet logged in

// Below Here is after the User have Logged in, we push his informations to the Data
export const actionTypes = {
    SET_USER:"SET_USER",
};
 
//here we ste the User accordingly to the trigged Action
 const reducer = (state ,action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user:action.user,
            };
        default:
            return state
    }
};
export default reducer;
