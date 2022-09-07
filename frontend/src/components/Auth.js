import React from "react";

class LoginForm extends React.Component {
    constructor(pros) {
        super(pros)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        // console.log(this.state.login + ' ' + this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <table align={"center"} width={"75%"} border={1}>
                <thead>
                    <th>
                        Login Form
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td align={"center"}>
                            <form onSubmit={(event)=> this.handleSubmit(event)}>
                                <input type="text" name="login" placeholder="login"
                                value={this.state.login} onChange={(event)=>this.handleChange(event)} />
                                <input type="password" name="password" placeholder="password"
                                value={this.state.password} onChange={(event)=>this.handleChange(event)} />
                                <input type="submit" value="Login" />
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
export default LoginForm