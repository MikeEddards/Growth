const initialState = {
        id: null,
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        image: '',
        children: []
}
const UPDATE_USER = 'UPDATE_USER'
const GET_CHILDREN = 'GET_CHILDREN'
const CLEAR_STORE = 'CLEAR_STORE'

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

function reducer (state = initialState, action){
    switch (action.type){
        case UPDATE_USER:
            const {id, username, email, first_name, last_name, image} = action.payload
            return {id, username, email, first_name, last_name, image}
        case GET_CHILDREN:
           return {
               ...state,
               children: action.payload
           }
        case CLEAR_STORE:
            console.log('bam')
            return{
                ...initialState
            }       
        default:
            return state    
    }
}

export default reducer



