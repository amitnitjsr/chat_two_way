import Data from '../components/data/contactList';
import ConversionData from '../components/Chat/chatPanel/data/conversationList';

const iState = {
    list: Data,
    ConversionDataList: ConversionData,
    MessageData: [],
    loginUserId: 0,
    receivedUserId: 0,
    showWhatsapp: false
};

const reducer = (state = iState, action) => {
    switch (action.type) {
        case "pushList":
            return {
                "MessageData": state.MessageData,
                "ConversionDataList": state.ConversionDataList,
                "loginUserId": state.loginUserId,
                "receivedUserId": state.receivedUserId,
                "showWhatsapp": state.showWhatsapp,
                "list": [...state.list, {
                    id: (state.list.length === 0) ? 1 : state.list[state.list.length - 1].id + 1,
                    name: action.payload.name, phone: (action.payload.phone),
                    address: action.payload.address, company: action.payload.company, email: action.payload.email
                }]
            };
        case "deleteListById":
            let result = Object.entries(action.payload.id);
            let array = result.map((val) => {
                return val[0]
            });

            // filter array with array of object
            return {
                "list": state.list.filter(f => !array.includes(f.id.toString())),
                "MessageData": state.MessageData,
                "ConversionDataList": state.ConversionDataList,
                "loginUserId": state.loginUserId,
                "receivedUserId": state.receivedUserId,
                "showWhatsapp": state.showWhatsapp
            };
        case "editListById":
            // eslint-disable-next-line
            const editedValue = state.list.map(item => {
                if (item.id === action.payload.id) {
                    // eslint-disable-next-line
                    item.name = action.payload.name, item.phone = action.payload.phone,
                        item.address = action.payload.address, item.company = action.payload.company,
                        item.email = action.payload.email
                    return item;
                }
                else
                    return item;
            });
            break;
        case "searchData":
            let filteredData = ''
            if (action.payload.searchInput) {
                filteredData = state.list.filter(value => {
                    return value.name
                        .toString()
                        .toLowerCase()
                        .includes(action.payload.searchInput.toLowerCase())
                })
                return {
                    "list": filteredData,
                    "MessageData": state.MessageData,
                    "ConversionDataList": state.ConversionDataList,
                    "loginUserId": state.loginUserId,
                    "receivedUserId": state.receivedUserId,
                    "showWhatsapp": state.showWhatsapp
                }
            }
            else {
                return {
                    "list": Data,
                    "MessageData": state.MessageData,
                    "ConversionDataList": state.ConversionDataList,
                    "loginUserId": state.loginUserId,
                    "receivedUserId": state.receivedUserId,
                    "showWhatsapp": state.showWhatsapp
                }
            }

        case "addChatmsg":

            const addMsg = state.ConversionDataList.map(item => {
                if (item.id === action.payload.id) {
                    let t = [...item.conversationData, {
                        'type': 'sent', 'message': action.payload.message, 'sentAt': new Date().toLocaleTimeString()
                    }]
                    let t1 = { id: item.id, name: item.name, email: item.email, company: item.company, conversationData: t }
                    return t1
                }
                else
                    return item
            });
            // console.log('addChatmsg', action.payload.id, addMsg)
            return {
                "ConversionDataList": addMsg,
                "list": state.list,
                "MessageData": state.MessageData,
                "loginUserId": state.loginUserId,
                "receivedUserId": state.receivedUserId,
                "showWhatsapp": state.showWhatsapp
            }

        case "addChatmsgRecieved":

            const addMsgRec = state.ConversionDataList.map(item => {
                if (item.id === action.payload.id) {
                    let t = [...item.conversationData, {
                        'type': 'received', 'message': action.payload.message, 'sentAt': new Date().toLocaleTimeString()
                    }]
                    let t1 = { id: item.id, name: item.name, email: item.email, company: item.company, conversationData: t }
                    return t1
                }
                else
                    return item
            });
            // console.log('addChatmsgRecieved', action.payload.id, addMsgRec)
            return {
                "ConversionDataList": addMsgRec,
                "list": state.list,
                "MessageData": state.MessageData,
                "loginUserId": state.loginUserId,
                "receivedUserId": state.receivedUserId,
                "showWhatsapp": state.showWhatsapp
            }

        case "addMessageData":
            let chatData = state.ConversionDataList.filter((val) => val.id === action.payload.id);
            let newmsg = chatData[0].conversationData;
            // console.log('addMessageData', newmsg)
            return {
                "ConversionDataList": state.ConversionDataList,
                "list": state.list,
                "MessageData": newmsg,
                "loginUserId": state.loginUserId,
                "receivedUserId": state.receivedUserId,
                "showWhatsapp": state.showWhatsapp
            }

        case "LoginUser":
            return {
                "ConversionDataList": state.ConversionDataList,
                "list": state.list,
                "MessageData": state.MessageData,
                "loginUserId": action.payload.id,
                "receivedUserId": state.receivedUserId,
                "showWhatsapp": state.showWhatsapp
            }

        case "ReceivedUserId":
            return {
                "ConversionDataList": state.ConversionDataList,
                "list": state.list,
                "MessageData": state.MessageData,
                "loginUserId": state.loginUserId,
                "receivedUserId": action.payload.id,
                "showWhatsapp": state.showWhatsapp
            }

        case "BoolCondtion":
            // console.log('BoolCondtion', action.payload.value)
            return {
                "ConversionDataList": state.ConversionDataList,
                "list": state.list,
                "MessageData": state.MessageData,
                "loginUserId": state.loginUserId,
                "receivedUserId": state.receivedUserId,
                "showWhatsapp": action.payload.value
            }
        default:
            return state;
    }
}

export default reducer;