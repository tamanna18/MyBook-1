import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import logo from "./Logopit.png";
import List from "./List";
import Timetable from "./Timetable";
import paper_plane from "./paper_plane.png";
import {create_todos, get_data, deleteTodo} from './UserFunction'
// import {get_data} from './UserFunction'
import './signup.css'

var colors = ['#58D3F7', '#F781F3', '#8000FF', '#A9F5D0', '#F5BCA9', '#8af'];

    var min = 0;
    var max = 4;


  const notestyle = {
    color: "white",
    width: "200px",
    backgroundColor: colors[Math.floor(Math.random() * (max - min)) + min],
    alignItems: 'center',
    padding: "50px",
    justifyContent: 'center',
    fontFamily: 'Arial',
    // margin: "2em",
    // marginLeft:"10em",

  };

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            studyprogram: '',
            email: '',
            notes: [],
            favoriteNote: '',
            tt: [],
            todolist: [],
            newtodo: '',
            deletetodolist: []

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const token2 = localStorage.todotoken
        const decoded2 = jwt_decode(token2)
        const token3 = localStorage.usertoken
        const decoded3 = jwt_decode(token3)
        this.setState({
            username: decoded.identity.username,
            studyprogram: decoded.identity.studyprogram,
            email: decoded.identity.email,
            notes: decoded.identity.notes,
            favoriteNote: decoded.identity.favoriteNote,
            todolist: decoded2.identity.todolist,
            tt: decoded.identity.timetable,
            deletetodolist: decoded3.identity.deletetodolist
        })
    }

    handleChange(e){
        this.setState({newtodo: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        const newTodo = {
            newtodo: this.state.newtodo,
            username: this.state.username
        }
        create_todos(newTodo).then(res => {
            window.location.reload()
        })
            .catch(err => {
                console.log(err)
            })
    }

    onDelete = (val, e) => {
        e.preventDefault()
        var data = [...this.state.todolist]
        data.filter((todo, index) =>{
            if (todo === val){
                data.splice(index, 1)
                const deleteTodoItem ={
                    deletetodo: todo,
                    username: this.state.username
                }
                deleteTodo(deleteTodoItem).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
            return true
        })
        const token = localStorage.deletetodotoken
        const decode = jwt_decode(token)
        this.setState({todolist: decode.identity.deletetodolist})
    }

    renderTodoList(){
        // if(othertodolist === null) {
            return this.state.todolist.map((todo, index) => {
                const {tasks} = todo
                return (
                    // <div key={index}>
                        <span className="item">
                            <p>
                                <span className="item-name">
                                    {todo}
                                </span>
                                <button onClick={this.onDelete.bind(this, todo)} className={"Button delete"}>-</button>
                            </p>
                        </span>
                    // </div>
                )

            })
        // } else {
        //     return othertodolist.map((todo, index) => {
        //         const {tasks} = todo
        //         return (
        //             <div key={index}>
        //                 <span className="item">
        //                     <p className="item-block">
        //                         <span className="item-name">
        //                             {todo}
        //                         </span>
        //                         <button onClick={this.onDelete.bind(this, todo)} className={"Button delete"}>-</button>
        //                     </p>
        //                 </span>
        //             </div>
        //         )
        //
        //     })
        // }

    }



    onSubmit(e) {
        e.preventDefault()
        const newData = {
            username: this.state.username,
            timetable: this.state.tt,
            favoriteNote: this.state.favoriteNote
        }
        get_data(newData).then(res => {
            window.location.reload()
        }).catch(err =>{
            console.log(err)
        });

    }

    // renderTableData(){
    //     return this.state.timetable.map((lectures, index) => {
    //         const {lecture, color, startMo, endMo, startTu, endTu, startWe, endWe, startTh, endTh, startFr, endFr} = lectures
    //
    //
    //         return(
    //             <tr key={lecture} style={{backgroundColor: this.state.color}}>
    //                 <td>{lecture}</td>
    //                 <td>{startMo} - {endMo}</td>
    //                 <td>{startTu} - {endTu}</td>
    //                 <td>{startWe} - {endWe}</td>
    //                 <td>{startTh} - {endTh}</td>
    //                 <td>{startFr} - {endFr}</td>
    //             </tr>
    //
    //
    //         )
    //     })
    // }

    renderTableData(){
        return this.state.tt.map((lectures,index  ) => {
            const {lecture, startMo, endMo, startTu, endTu, startWe, endWe, startTh, endTh, startFr, endFr} = lectures

            return(
                <tr key={lecture}>
                    <td>{lecture}</td>
                    <td>{startMo} - {endMo}</td>
                    <td>{startTu} - {endTu}</td>
                    <td>{startWe} - {endWe}</td>
                    <td>{startTh} - {endTh}</td>
                    <td>{startFr} - {endFr}</td>
                </tr>
            )
        })
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row first-row"></div>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-md-5 header-row pos-cent">
                        <h1 className="heading text-center display-1">{this.state.username}'s Homepage</h1>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5"></div>

                </div>
                <div className="row ">
                    <div className="col-md-5 ">
                        <form onSubmit={this.handleSubmit} className="input">
                            <input
                                className="add-input"
                                type = "text"
                                value = {this.state.newtodo}
                                onChange={this.handleChange}
                                required="required"
                            >
                            </input>
                            <button type={"submit"} className={"Button"}>
                                Add
                            </button>
                        </form>
                    </div>
                    <div className="col-md-2" ></div>
                    <div className="col-md-5 ">
                        <table id='lectures' style={{backgroundColor: 'rgba(0,255,32,0.55)'}}>
                                <thead className="tableheader">
                                <tr>
                                    <th>Lecture</th>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                </tr>
                                </thead>
                                <tbody className="tablebody">
                                {this.renderTableData()}
                                </tbody>
                            </table>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-md-5 lefttodo">
                        {this.renderTodoList()}
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 leftlogin"><button type="submit" className="Buttonsubmit" onClick = {this.onSubmit} >
                        <label className="buttonrefresh">Refresh</label>
                    </button></div>

                </div>
                <div className="row">
                    <div className="col-md-5  ">
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-5">
                        <h2 style = {notestyle}>{this.state.favoriteNote}</h2>
                    </div>

                </div>
                </div>
        )
    }
}

export default Profile