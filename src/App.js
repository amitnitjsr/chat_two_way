import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ReactTable from './components/contacts/ReactTable';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Sidebar />
          <ReactTable />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
