const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messagesData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ],

    dialogs: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:        
            let body = action.newMessageBody;
            return { 
                ...state,
                messagesData: [...state.messagesData, { id: 6, message: body }]
             };
        default:
            return state;
    }
}

export const sendMessageCreator  = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;