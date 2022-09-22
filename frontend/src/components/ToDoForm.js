import React from "react";

class ToDoForm extends React.Component {
    constructor(pros) {
        super(pros)
        this.state = {
            "project": pros.projects[0].id,
            "text_note": "",
            "user_author": pros.todo_author
        }
    }
    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    handleSubmit(event){
        // console.log(this.state.project)
        // console.log(this.state.text_note)
        // console.log(this.state.user_author)
        this.props.createTodo(this.state.project, this.state.text_note, this.state.user_author)
        event.preventDefault()
    }
    render() {
        return(
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group" align={"center"}>
                    <label htmlFor="project">Project</label><br/>
                    <select className="form-control" name="project" onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((item)=><option value={item.id}>{item.name}</option> )}
                    </select>
                </div>
                <div className="form-group" align={"center"}>
                    <label htmlFor="text_note">Note</label><br/>
                    <textarea className="form-control" name="text_note" onChange={(event)=>this.handleChange(event)} cols={60} rows={7}>
                        {this.state.text_note}
                    </textarea>
                </div>
                <center><input type="submit" className="btn btn-primary" value="Save" /></center>
            </form>
        )
    }
}

export default ToDoForm