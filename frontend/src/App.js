import logo from './logo.svg';
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
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/todousers/').then(response =>{
                const users = response.data.results;
                this.setState(  {
                    'users' : users
                });
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:7000/api/projects/').then(response =>{
            const projects = response.data.results;
            this.setState({
                'projects' : projects
            })
        })
        axios.get('http://127.0.0.1:7000/api/ToDo/').then(response =>{
            const todos = response.data.results;
            this.setState({
                'ToDos' : todos
            })
            //console.log(this.state)
        })
        axios.get('http://localhost:7000/api/projects/1/').then(response =>{
            const todos = response.data.results;
            this.setState({
                'ToDos' : todos
            })
            //console.log(this.state)
        })
    }

    render () {
        //console.log(this.state.users)
        return (
            <div>

                <BrowserRouter>
                    <Menu/>
                    <Routes>
                        <Route exact path='/' element={<Users users={this.state.users}/>}/>
                        <Route exact path='Projects' element={<Projects projects={this.state.projects}/>}/>
                        <Route path='project/:id' element={<ProjectInfo projects={this.state.projects}/>}/>
                        <Route exact path='ToDo' element={<ToDo todos={this.state.ToDos}/>}/>
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
