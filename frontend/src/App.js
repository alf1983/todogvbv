// import logo from './logo.svg';
import './App.css';
import React from 'react'
import Menu from "./components/Menu";
import Footer from "./components/Footer"
import axios from "axios";
import Users from "./components/Users";
import Projects from "./components/Projects";
import ProjectInfo from "./components/ProjectInfo";
import ToDo from "./components/ToDo";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie";

const NotFound404 = ({ location }) => {
  return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
  )
}

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'ToDos' : [],
            'token': '',
            'username': '',
        }
    }

    set_token(token, username=''){
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({'token': token, 'username': username}, ()=>this.load_data())
    }

    is_authenticated(){
        // console.log('vasia')
        return !!this.state.token
    }

    logout(){
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({'token': token, 'username': username}, ()=>this.load_data())
    }

    get_token(username, password){
        const data = {
            'username': username,
            'password': password
        }
        axios.post('http://127.0.0.1:7000/api-token-auth/', data).then(response =>{
                this.set_token(response.data['token'], username)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers(){
        let headers = {
            'Content-Type': 'application/json',
        }
        if (this.is_authenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:7000/api/todousers/', {headers}).then(response =>{
                const users = response.data.results;
                this.setState(  {
                    'users' : users
                });
            }).catch(error => {
            console.log(error)
            this.setState({'users': []})
        })
        axios.get('http://127.0.0.1:7000/api/projects/', {headers}).then(response =>{
            const projects = response.data.results;
            this.setState({
                'projects' : projects
            })
        })
        axios.get('http://127.0.0.1:7000/api/ToDo/', {headers}).then(response =>{
            const todos = response.data.results;
            this.setState({
                'ToDos' : todos
            })
            //console.log(this.state)
        })
    }
    componentDidMount() {
        this.get_token_from_storage()
        // this.load_data()
    }

    render () {
        //console.log(this.state.username)
        return (
            <div>

                <BrowserRouter>
                    <Menu cls={this}/>
                    <Routes>
                        <Route exact path='/' element={<Users users={this.state.users}/>}/>
                        <Route exact path='Projects' element={<Projects projects={this.state.projects}/>}/>
                        <Route path='project/:id' element={<ProjectInfo projects={this.state.projects}/>}/>
                        <Route exact path='ToDo' element={<ToDo todos={this.state.ToDos}/>}/>
                        <Route exact path='Login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route path="*" element={
                            <NotFound404/>
                        }
    />
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
