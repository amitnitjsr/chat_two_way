import React, { Component } from 'react'
import './Sidebar.css';
// import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: false,
            task: false
        }
    }
    toggle = (name) => {
        this.setState((prevState) => {
            return { [name]: !prevState[name] }
        })
    }

    render() {
        return (
            <div className="sidenav">
                <Row className='btn-pos'>
                    <i className="zmdi zmdi-format-subject"></i>
                </Row><br />&nbsp;
                <Row className='btn-pos'>
                    <i className="zmdi zmdi-home zmdi-hc-lg"></i>
                </Row>&nbsp;&nbsp;
                <Row className='btn-pos'>
                    <i className="zmdi zmdi-account-o zmdi-hc-lg"></i>
                </Row>
            </div>
        )
    }
}

export default Sidebar;