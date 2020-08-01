import React, {Component} from 'react'
import paper_plane from './paper_plane.png'
import {HuePicker} from 'react-color'
import {createLecture} from "./UserFunction";
import './timttable.css'
// import nextId from "react-id-generator";
import jwt_decode from 'jwt-decode'




class Timetable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newlecture: '',
            color: '#8ff',
            starttimemonday: '',
            endtimemonday:'',
            starttimetuesday: '',
            endtimetuesday:'',
            starttimewednesday: '',
            endtimewednesday:'',
            starttimethursday: '',
            endtimethursday:'',
            starttimefriday: '',
            endtimefriday:'',
            username: '',
            lectureList: []
            // lectureList: lectureList,
            // lectures: [
            //     // {id: lecId, lecName: this.state.lecture, startMo: this.state.starttimemonday, endMo:this.state.endtimemonday, startTu: this.state.starttimetuesday, endTu:this.state.endtimetuesday, startWe:this.state.starttimewednesday, endWe: this.state.endtimewednesday, startTh:this.state.starttimethursday, endTh:this.state.endtimethursday, startFr:this.state.starttimefriday, endFr:this.state.endtimefriday, color:this.state.color},
            //     {id:1, lecName:'test1', startMo: '12:00', endMo:'14:00', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'', endFr:'',},
            //     {id:2, lecName:'test2', startMo: '', endMo:'', startTu: '14:00', endTu:'16:00', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'', endFr:''},
            //     {id:3, lecName:'test3', startMo: '10:00', endMo:'12:00', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'16:00', endTh:'18:00', startFr:'', endFr:''},
            //     {id:4, lecName:'test4', startMo: '', endMo:'', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'10:00', endFr:'12:00'}
            //     ]

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChangeComplete = this.handleChangeComplete.bind(this)
    }

    componentDidMount() {
        const token = localStorage.lecturetoken
        const token2 = localStorage.usertoken
        const decoded = jwt_decode(token)
        const decoded2 = jwt_decode(token2)
        this.setState({
            lectureList: decoded.identity.lectures,
            username: decoded2.identity.username
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    handleChangeComplete = (color) =>{
        this.setState({color : color.hex})
    }

    // addLecture = (lecture) =>{
    //     const {lectureList} = this.state
    //     lecture.id = this.lecId
    //     let updateList = [...lectureList, lecture]
    //     this.setState({
    //         lectureList: updateList
    //     })
    // }

    onSubmit(e){
        e.preventDefault()
        // this.setState({
        //     newlecture: this.state.lecture,
        //     color: this.state.color,
        //     starttimemonday: this.state.starttimemonday,
        //     endtimemonday:this.state.endtimemonday,
        //     starttimetuesday: this.state.starttimetuesday,
        //     endtimetuesday:this.state.endtimetuesday,
        //     starttimewednesday: this.state.starttimewednesday,
        //     endtimewednesday: this.state.endtimewednesday,
        //     starttimethursday: this.state.starttimethursday,
        //     endtimethursday:this.state.endtimethursday,
        //     starttimefriday: this.state.starttimefriday,
        //     endtimefriday: this.state.endtimefriday,
        //     username: this.state.username
        // })

        const newLecture = {
            newlecture: this.state.newlecture,
            color: this.state.color,
            starttimemonday: this.state.starttimemonday,
            endtimemonday:this.state.endtimemonday,
            starttimetuesday: this.state.starttimetuesday,
            endtimetuesday:this.state.endtimetuesday,
            starttimewednesday: this.state.starttimewednesday,
            endtimewednesday: this.state.endtimewednesday,
            starttimethursday: this.state.starttimethursday,
            endtimethursday:this.state.endtimethursday,
            starttimefriday: this.state.starttimefriday,
            endtimefriday: this.state.endtimefriday,
            username: this.state.username
        }

        createLecture(newLecture).then(res => {
            window.location.reload()
        }).catch(err =>{
            console.log(err)
        })

    }

    renderTableData(){
        return this.state.lectureList.map((lectures, index) => {
            const {lecture, color, startMo, endMo, startTu, endTu, startWe, endWe, startTh, endTh, startFr, endFr} = lectures
            var colour = {color}
            colour = colour.hex

            return(
                <tr key={lecture} style={{backgroundColor: colour}}>
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

    render() {


        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row first-row"></div>
                    </div>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-5 left header-row">
                            <h1 className="heading text-center display-1">MyBook Time table!</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 table">
                            <table id='lectures'>
                                <thead>
                                    <tr>
                                        <th>Lecture</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableData()}
                                    {/*<tr>{this.state.lectureList}</tr>*/}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right papper">
                            <div className="form-group">
                                <input type="text"
                                       className="form-control form-control-lg"
                                       name="newlecture"
                                       placeholder="Lecture"
                                       value={this.state.newlecture}
                                       onChange={this.onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right picker">
                            <HuePicker color={this.state.color} onChangeComplete={this.handleChangeComplete}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left papper">
                            <img src={paper_plane} width="200" alt="Paper Plane" />
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right picker">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-2"><h5>Monday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimemonday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimemonday"
                                               value={this.state.starttimemonday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimemonday">End time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimemonday"
                                               value={this.state.endtimemonday}
                                               placeholder="14:00:"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2"> <h5>Tuesday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimetuesday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimetuesday"
                                               value={this.state.starttimetuesday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimetuesday">End time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimetuesday"
                                               value={this.state.endtimetuesday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2"> <h5>Wednesday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimewednesday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimewednesday"
                                               value={this.state.starttimewednesday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimewednesday">End time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimewednesday"
                                               value={this.state.endtimewednesday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2"><h5>Thursday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimethursday">End time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimethursday"
                                               value={this.state.starttimethursday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-5 mb-auto">
                                        <label htmlFor="endtimethursday">End time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimethursday"
                                               value={this.state.endtimethursday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2"> <h5>Friday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimefriday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimefriday"
                                               value={this.state.starttimefriday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimefriday">End time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimefriday"
                                               value={this.state.endtimefriday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row papper">
                                    <button type="submit" className="btn btn-lg btn-dark btn-primary btn-block center-block">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Timetable