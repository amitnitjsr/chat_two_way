import React, { Component } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux";
import './Chat.css';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
        // borderRadius: '2% 94% 3% 94% / 88% 6% 88% 6%'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500]
    },
});

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1)
//     }
// }))(MuiDialogActions);

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle
            disableTypography
            className={classes.root}
            {...other}
        >
            <Typography style={{ color: 'white' }} variant="h6">
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    style={{ color: 'grey' }}
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: false,
            message: null,
            typeText: '',
            id: 0,
            renderMessage: []
        }

    }

    componentDidMount() {
        // console.log('componentDidMount chat', this.props.id, this.props.ConversionDataList);
        this.setState({ id: this.props.id });
        let chatData = this.props.ConversionDataList.filter((val) => val.id === this.props.id);
        let newmsg = chatData[0].conversationData;
        this.setState({ renderMessage: newmsg })
    }

    popupToggle = () => {
        this.props.chatHandler();
    }

    inputHadler = (e) => {
        this.setState({ typeText: e.target.value, message: e.target.value })
    }

    enteredHandler = (e) => {
        if (e.key === 'Enter') {
            this.setState({ message: this.state.typeText })
            this.setState({ typeText: '' });
            // console.log('id', this.props.id, this.state.id)
            this.props.addChatmsg(this.state.id, this.state.message);
            this.props.addMessageData(this.state.id);
        }
    }

    render() {

        let chatBox = (
            <Dialog maxWidth={'md'} fullWidth={true} open={this.props.chat} >
                <DialogTitle onClose={() => this.popupToggle()} >
                    {this.props.name} {' : Chat process '}
                </DialogTitle>
                <DialogContent>
                    <Row style={{ padding: '5px' }}>
                        {this.props.MessageData ?
                            <div className="chat-main-content">
                                {this.props.MessageData.map((conversation, index) => conversation.type === 'sent' ?
                                    <div className="d-flex flex-nowrap chat-item flex-row-reverse">
                                        <Card style={{ margin: '5px' }}>
                                            <CardBody>
                                                <div className="sentmessage">
                                                    <div className="message">{conversation.message}</div>
                                                    <div className="time text-muted text-right mt-2">
                                                        {conversation.sentAt}
                                                        <i className="zmdi zmdi-check-all color" />
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
                                                    <div className="time text-muted text-right mt-2">{conversation.sentAt}</div>
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
                </DialogContent>

            </Dialog >
        );
        return (
            <div>
                {chatBox}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ConversionDataList: state.ConversionDataList,
        MessageData: state.MessageData,
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
        addMessageData: (id) => {
            dispatch({
                type: 'addMessageData',
                payload: {
                    "id": id
                }
            })
        }

    }
}

export default connect(mapStateToProps, mapDispachToProps)(Chat);