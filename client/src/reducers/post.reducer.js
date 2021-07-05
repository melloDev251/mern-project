import { GET_POSTS } from "../actions/post.actions";


const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_POSTS:
            return action.payload
    
        default:
            return state;
    }
}