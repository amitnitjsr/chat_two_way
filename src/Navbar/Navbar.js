import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import './Navbar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import Chat from '../components/Chat/Chat';
// import ChatContact from '../components/Chat/chatPanel/data/chatUsers';
// import ConversionData from '../components/Chat/chatPanel/data/conversationList';
import { connect } from "react-redux";
// import ReactTable from '../components/contacts/ReactTable';

const drawerWidth = 72;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));


function Navbar(props) {
    const classes = useStyles();
    const [chat, setChat] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    // const [id, setId] = useState(0);
    // const [name, setName] = useState('')
    // const [chatMsg, setChatmsg] = useState('')

    const chatHandler = (id, name) => {

        // let chatData = ConversionData.filter((val) => val.id === id);
        if (id !== undefined) {
            // let newmsg = chatData[0].conversationData;
            // setChatmsg(newmsg);
            props.LoginUser(id);
        }
        // setName(name)
        // setId(id);
        setChat(!chat);
        props.BoolCondtion(false);
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <span>
                        <i className="zmdi zmdi-search zmdi-hc-lg"></i>
                    </span>
                    <div className="col-md-2 col-sm-2 ml-auto">
                        <Row>
                            <span>
                                <i className="zmdi zmdi-plus "></i>Add
                            </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>
                                <i className="zmdi zmdi-email zmdi-hc-lg"></i>
                            </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <span>
                                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle caret>
                                        <i className="zmdi zmdi-account-o zmdi-hc-lg"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {props.ConversionDataList.map((val) => {
                                            return (
                                                <DropdownItem
                                                    key={val.id}
                                                    onClick={() => chatHandler(val.id, val.name)}
                                                >
                                                    {val.name}
                                                </DropdownItem>)
                                        })
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </span>

                        </Row>

                    </div>
                </Toolbar>
            </AppBar>
            {/* {chat ?
                <Chat chatHandler={chatHandler} chatMsg={chatMsg}
                    chat={chat} id={id} name={name} /> :
                null
            } */}

        </div >

    );
}

const mapStateToProps = (state) => {
    return {
        ConversionDataList: state.ConversionDataList,
    }
}

const mapDispachToProps = (dispatch) => {
    return {

        addMessageData: (id) => {
            dispatch({
                type: 'addMessageData',
                payload: {
                    "id": id
                }
            })
        },
        LoginUser: (id) => {
            dispatch({
                type: 'LoginUser', payload: { 'id': id }
            })
        },
        BoolCondtion: (value) => {
            dispatch({
                type: 'BoolCondtion', payload: { 'value': value }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispachToProps)(withRouter(Navbar));

// export default withRouter(Navbar);