import logo from './logo.svg';
import './App.css';
import React from 'react'
import Menu from "./components/Menu";
import Footer from "./components/Footer"
import axios from "axios";
import Users from "./components/Users";

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            'users': []
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/todousers/').then(response =>{
                const users = response.data
                    this.setState(
                        {
                            'users': users
                        }
                    )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <Menu/>
                <Footer/>
                <Users users={this.state.users}/>
            </div>
        )
    }
}

export default App;
