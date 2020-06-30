import React from 'react';
// import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './ShowDetail.css';
import { Row, Card, CardBody } from 'reactstrap';
// import Avatar from '@material-ui/core/Avatar';
// import ColorName from '../data/ColorData';
import { connect } from "react-redux";

class ShowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            message: null,
            typeText: '',
            id: 0,
            renderMessage: []
        }
    }

    inputHadler = (e) => {
        this.setState({ typeText: e.target.value, message: e.target.value })
    }

    enteredHandler = (e) => {
        if (e.key === 'Enter') {
            this.setState({ message: this.state.typeText })
            this.setState({ typeText: '' });
            // console.log('id', this.props.loginUserId, this.props.receivedUserId, this.state.message)
            this.props.addChatmsg(this.props.loginUserId, this.state.message);
            this.props.addChatmsgRecieved(this.props.receivedUserId, this.state.message)
            this.props.addMessageData(this.props.receivedUserId);
        }
    }

    render() {
        // console.log('this.props.MessageData', this.props.MessageData)
        return (
            <div>
                <div className='card_body'>
                    <Row style={{ padding: '5px' }}>
                        {this.props.MessageData ?
                            <div className="chat-main-content">
                                {this.props.MessageData.map((conversation, index) => conversation.type === 'received' ?
                                    <div className="d-flex flex-nowrap chat-item flex-row-reverse">
                                        <Card style={{ margin: '5px' }}>
                                            <CardBody>
                                                <div className="sentmessage">
                                                    <div className="message">{conversation.message}</div>
                                                    <div className="time text-muted text-right mt-2">
                                                        {conversation.sentAt}
                                                        <i className="zmdi zmdi-check"></i>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    :
                                    <div className="d-flex flex-nowrap chat-item">
                                        <Card style={{ margin: '5px' }}>
                                            <CardBody>
                                                <div className="bubble">
                                                    <div className="message">{conversation.message}</div>
                                                    <div className="time text-muted text-right mt-2">
                                                        {conversation.sentAt}<i className="zmdi zmdi-check-all color" />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                )}
                            </div>
                            : null
                        }
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <textarea placeholder="Type message and hit entered" value={this.state.typeText}
                            onChange={(e) => this.inputHadler(e)}
                            onKeyPress={(e) => this.enteredHandler(e)}
                            rows="4" cols="150" />
                    </Row>
                </div>
                <br />
                <Card className='card_body'>
                    <CardContent>
                        <Row className='xs'>
                            <span style={{ margin: 'auto' }}><span style={{ fontSize: '14px' }}>Tax Evasion & Payout Notice</span></span>
                        </Row>
                        <Row className='xs'>
                            <span style={{ margin: 'auto' }}><span style={{ fontSize: '14px' }}>{this.props.date}</span></span>
                        </Row>
                    </CardContent>
                </Card>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ConversionDataList: state.ConversionDataList,
        MessageData: state.MessageData,
        loginUserId: state.loginUserId,
        receivedUserId: state.receivedUserId
    }
}

const mapDispachToProps = (dispatch) => {
    return {

        addChatmsg: (id, message) => {
            dispatch({
                type: 'addChatmsg',
                payload: {
                    "id": id, "message": message

                }
            })
        },

        addChatmsgRecieved: (id, message) => {
            dispatch({
                type: 'addChatmsgRecieved',
                payload: {
                    "id": id, "message": message
                }
            })
        },
        addMessageData: (id) => {
            dispatch({
                type: 'addMessageData',
                payload: {
                    "id": id
                }
            })
        },

    }
}

export default connect(mapStateToProps, mapDispachToProps)(ShowDetails);

