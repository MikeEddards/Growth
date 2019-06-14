const initialState = {
        email: '',
        first_name: '',
        last_name: '',
        image: '',
        children: [],
        ageData: [],
}
const UPDATE_USER = 'UPDATE_USER'
const GET_CHILDREN = 'GET_CHILDREN'
const CLEAR_STORE = 'CLEAR_STORE'
const ADD_AGE_DATA = 'ADD_AGE_DATA'

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function getChildren(children){
    return {
        type: GET_CHILDREN,
        payload: children
    }
}
export function clearStore(){
    return {
        type: CLEAR_STORE
    }
}
export function addAgeData(data){
    return {
        type: ADD_AGE_DATA,
        payload: data
    }
}

function reducer (state = initialState, action){
    switch (action.type){
        case UPDATE_USER:
            const {email, first_name, last_name, image} = action.payload
            return {email, first_name, last_name, image}
        case GET_CHILDREN:
           return {
               ...state,
               children: action.payload
           }
        case CLEAR_STORE:

            return{
                ...initialState
            }
        case ADD_AGE_DATA:
           console.log(action.payload)
            return {
                ...state,
                ageData: action.payload
            }           
        default:
            return state    
    }
}

export default reducer



