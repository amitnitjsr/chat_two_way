import React from 'react'
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
// import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Row, Col, Button, Input } from 'reactstrap';
import ShowDetail from '../cards/ShowDetail';
import { connect } from "react-redux";
import ColorName from '../data/ColorData';
import './ReactTable.css';

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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

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

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            // tableData: this.props.list,
            selectedRow: null,

            //add contact
            showPopup: false,
            name: '',
            email: '',
            phone: '',
            address: '',
            designation: '',
            editAdd: false,
            // nameValidation: false,
            emailValidation: false,
            phoneValidation: false,

            // search
            searchInput: "",
            deleteBtnHide: true,
            editBtnHide: true,
            chat: false,


        }
    }

    toggleRow = (row) => {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[row.id] = !this.state.selected[row.id];
        this.setState({ selected: newSelected }, () => {
            if (this.state.selected[row.id] === false) {
                delete this.state.selected[row.id];
            }
            if (Object.keys(this.state.selected).length !== 0) {
                this.setState({ deleteBtnHide: false })
            }
            else {
                this.setState({ deleteBtnHide: true })
            }

        })
    }

    deleteHandler = () => {
        if (Object.keys(this.state.selected).length !== 0) {
            this.props.deleteListById(this.state.selected);
            this.setState({ selectedRow: null, selected: {}, deleteBtnHide: true, editBtnHide: true })
        }
    }

    addHandler = () => {
        this.setState({
            name: '', email: '',
            address: '', company: '',
            phone: '', designation: '', editAdd: true
        });
        this.popupToggle();
    }

    editHandler = () => {
        if (this.state.selectedRow) {
            this.setState({
                name: this.state.selectedRow.name, email: this.state.selectedRow.email,
                address: this.state.selectedRow.address, company: this.state.selectedRow.company,
                phone: this.state.selectedRow.phone, designation: this.state.selectedRow.designation,
                editAdd: false
            });
            this.popupToggle();
        }
    }
    popupToggle = () => {
        this.setState((preState) => {
            return { showPopup: !preState.showPopup }
        })
    }

    handleSubmit = () => {
        if (this.state.editAdd) {
            console.log()
            this.popupToggle();
            this.props.pushList(this.state.name, this.state.phone, this.state.email, this.state.designation,
                this.state.address, this.state.company);
        }
        else {
            this.popupToggle();
            this.props.editListById(this.state.selectedRow.id, this.state.name, this.state.phone, this.state.email, this.state.designation,
                this.state.address, this.state.company);
        }

    }

    inputChangeHandler = (name, e) => {
        this.setState({ [name]: e.target.value }, () => {

            if (name === 'email') {
                const email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                if (this.state.email.match(email) || this.state.email.length === 0)
                    this.setState({ emailValidation: false })
                else
                    this.setState({ emailValidation: true })
            }
            else if (name === 'phone') {
                const regularExpression = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (this.state.phone.match(regularExpression) || this.state.phone.length === 0)
                    this.setState({ phoneValidation: false })
                else
                    this.setState({ phoneValidation: true })
            }
        })
    }

    inputSearchHandler = (name, e) => {
        this.setState({ [name]: e.target.value }, () => {
            this.props.searchData(this.state.searchInput)
        });
    }

    chatHandler = (id) => {
        this.setState({ chat: !this.props.showWhatsapp }, () => {
            this.props.BoolCondtion(this.state.chat);
        });
        this.props.addMessageData(id);
        this.props.ReceivedUserId(id);

    }

    render() {
        // console.log('po', this.props.loginUserId)
        let add_Edit_contact = (
            <Dialog open={this.state.showPopup} onClose={this.popupToggle}>
                <DialogTitle onClose={this.popupToggle} >
                    {this.state.editAdd ? 'Add: Contact' : 'Edit: Contact'}
                </DialogTitle>
                <DialogContent>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'  >
                            <span
                            >Full Name:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <Input type='text' value={this.state.name}
                                onChange={(event) => this.inputChangeHandler('name', event)} />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'  >
                            <span
                            >Email:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <Input type='text' value={this.state.email} invalid={this.state.emailValidation}
                                onChange={(event) => this.inputChangeHandler('email', event)} />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Phone:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <Input type='number' value={this.state.phone} invalid={this.state.phoneValidation}
                                onChange={(event) => this.inputChangeHandler('phone', event)} />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Company:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <Input type='text' value={this.state.company}
                                onChange={(event) => this.inputChangeHandler('company', event)} />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Designation:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <Input type='text' value={this.state.designation}
                                onChange={(event) => this.inputChangeHandler('designation', event)} />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Address:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <Input type='text' value={this.state.address}
                                onChange={(event) => this.inputChangeHandler('address', event)} />
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleSubmit
                        }
                        disabled={this.state.emailValidation
                            || this.state.phoneValidation}
                        className='button_pos'
                    >
                        {this.state.editAdd ? 'Add' : 'Edit'}
                    </Button>
                </DialogActions>
            </Dialog >
        );
        return (

            <div className="row" style={{ paddingTop: '100px' }}>
                {add_Edit_contact}
                <Col md='1' ></Col>
                <Col md="6">
                    {/* <Row >
                        <Col sm="6"> <form className="example" style={{ maxWidth: '280px' }}>
                            <input type="text" placeholder="Search.."
                                value={this.state.searchInput}
                                name="search2"
                                onChange={(event) => this.inputSearchHandler('searchInput', event)}
                            />
                            <button type="submit"><i className="fa fa-search"></i></button>
                        </form>
                        </Col>
                        <Col sm="6">
                            <Button className='button_color' onClick={() => this.addHandler()}>+ Add Contact</Button>
                                    &nbsp;<Button disabled={this.state.editBtnHide} className='button_color' onClick={() => this.editHandler()}>Edit</Button>
                                    &nbsp;<Button disabled={this.state.deleteBtnHide} className='button_color' onClick={() => this.deleteHandler()}>Delete</Button>
                        </Col>
                    </Row> */}

                    <ReactTable
                        data={this.props.ConversionDataList ? this.props.ConversionDataList : []}
                        columns={[
                            {
                                Header: () => <div className="ID">Id</div>,
                                accessor: 'id',
                                className: 'ID TextCenter',
                                headerClassName: 'ID TextCenter',
                                // Cell: (row) => {
                                //     return (
                                //         <Checkbox
                                //             // color="red"
                                //             checked={this.state.selected[row.row._original.id] === true}
                                //             onChange={() => {
                                //                 this.toggleRow(row.row._original);
                                //             }}
                                //         />
                                //     )
                                // },
                                style: {
                                    textAlign: 'center', position: 'relative', marginTop: '4%'
                                },
                                sortable: false,
                                filterable: false,
                                foldable: true,
                                width: 75
                            },
                            {
                                Header: () => <div className="Header" style={{ textAlign: 'initial' }} >Basic info</div>,
                                // accessor: 'name',
                                className: 'Name TextCenter',
                                headerClassName: 'Name TextCenter',
                                Cell: (row) => {

                                    return (
                                        <div style={{ padding: '13px' }}>
                                            <Row>
                                                <Avatar
                                                    style={{ backgroundColor: ColorName[Math.floor(Math.random() * ColorName.length)] }}>
                                                    <span style={{ fontSize: '14px' }}>
                                                        {row.row._original.name ?
                                                            row.row._original.name.match(/\b(\w)/g).join('')
                                                            : null}
                                                    </span></Avatar>
                                                <Row>
                                                    <Col>
                                                        <span style={{ fontWeight: 600 }}>{row.row._original.name}</span><br />
                                                        <span style={{ fontSize: '13px' }}>{row.row._original.email}</span>
                                                    </Col>
                                                </Row>
                                            </Row>
                                        </div>
                                    )
                                },
                                foldable: true
                            },
                            {
                                Header: () => <div className="Header" >Company</div>,
                                accessor: 'company',
                                foldable: true,
                                className: 'company TextCenter',
                                headerClassName: 'company TextCenter',
                                style: {
                                    textAlign: 'center', position: 'relative', marginTop: '4%'
                                }
                            },
                            {
                                Header: () => <div className="Header" >Chat</div>,
                                accessor: 'company',
                                foldable: true,
                                // className: 'company TextCenter',
                                className: 'ID TextCenter',
                                headerClassName: 'ID TextCenter',
                                Cell: (row) => {
                                    return (
                                        <div>
                                            {
                                                this.props.loginUserId !== 0 && this.props.loginUserId !== row.row._original.id ?

                                                    <div onClick={() => this.chatHandler(row.row._original.id)}>
                                                        <i className="zmdi zmdi-whatsapp"></i>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    )
                                },
                                style: {
                                    textAlign: 'center'
                                },
                            },
                        ]}
                        pageSize={this.props.ConversionDataList.length}

                        showPaginationBottom={false}
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: e => {
                                        this.setState({ selectedRow: rowInfo.row._original }, () => {
                                            if (this.state.selectedRow !== null)
                                                this.setState({ editBtnHide: false })
                                            else {
                                                this.setState({ editBtnHide: true })
                                            }

                                        });
                                        if (rowInfo.index !== this.state.rowEdit) {
                                            this.setState({
                                                rowEdit: rowInfo.index,
                                                selectedRowIndex: rowInfo.original,
                                                selectionChanged: this.state.selectionChanged
                                                    ? false
                                                    : true
                                            });
                                        } else {
                                            this.setState({
                                                rowEdit: null
                                            });
                                        }
                                    },
                                    style: {
                                        background:
                                            rowInfo.index === this.state.rowEdit && this.state.selectedRow ? "#e9ecef" : "white",
                                        color:
                                            rowInfo.index === this.state.rowEdit ? "black" : "black"
                                    }
                                };
                            } else {
                                console.log('.......')

                                return {};
                            }
                        }}
                    />
                </Col>
                <Col md="2">
                    {this.props.showWhatsapp ?
                        <ShowDetail data={this.state.selectedRow}
                            date={new Date().toDateString() + ',' + new Date().toLocaleTimeString()} /> :
                        null
                    }
                </Col>
            </div >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        list: state.list,
        loginUserId: state.loginUserId,
        ConversionDataList: state.ConversionDataList,
        showWhatsapp: state.showWhatsapp
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        deleteListById: (id) => { dispatch({ type: "deleteListById", payload: { "id": id } }) },
        pushList: (name, phone, email, designation, address, company) => {
            dispatch({
                type: 'pushList',
                payload: {
                    "name": name, "phone": phone, "email": email,
                    "designation": designation, "address": address,
                    "company": company
                }
            })
        },
        editListById: (id, name, phone, email, designation, address, company) => {
            dispatch({
                type: 'editListById',
                payload: {
                    "id": id, "name": name, "phone": phone, "email": email,
                    "designation": designation, "address": address,
                    "company": company
                }
            })
        },
        searchData: (searchInput) => {
            dispatch({ type: 'searchData', payload: { "searchInput": searchInput } })
        },

        addMessageData: (id) => {
            dispatch({
                type: 'addMessageData',
                payload: {
                    "id": id
                }
            })
        },

        ReceivedUserId: (id) => {
            dispatch({
                type: 'ReceivedUserId',
                payload: {
                    "id": id
                }
            })
        },
        BoolCondtion: (value) => {
            dispatch({
                type: 'BoolCondtion', payload: { 'value': value }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Table);