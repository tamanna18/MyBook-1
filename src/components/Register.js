import React, {Component} from 'react'
import {register} from './UserFunction'
import {Input, Form, FormGroup} from 'reactstrap'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            studyprogram: '',
            password: '',
            confirmpassword:'',
            mai: '',
            ise:'',
            komedia:'',
            otherprogram:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
        this.setState({studyprogram: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()


        const newUser = {
            username: this.state.username,
            email: this.state.email,
            studyprogram: this.state.value,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword
        }

        register(newUser).then(res => {
            if(this.state.password === this.state.confirmpassword) {
                this.props.history.push('/login')
            }

        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="h3 mb-3 font-weight-normal">Sign up!</h1>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-6 left">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                       className="form-control"
                                       name="username"
                                       placeholder="Enter Username"
                                       value={this.state.username}
                                       onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col-md-6 right">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                       className="form-control"
                                       name="email"
                                       placeholder="Enter Email"
                                       value={this.state.email}
                                       onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 left">
                            <div className="form-group">
                                <label htmlFor="studyprogram">Study program</label>
                                <select onChange={this.onChange} className="form-control" value={this.state.studyprogram}>
                                    <option value="mai">Master Angewandte Informatik</option>
                                    <option value="ise">Master Computer Engineering</option>
                                    <option value="komedia">Master Angewandte Kognitions- und Medienwissenschaft</option>
                                    <option value="otherprogram">Other</option>
                                </select>

                                {/*<Form>*/}
                                {/*    <FormGroup>*/}
                                {/*        <label htmlFor="studyprogram">Study program</label>*/}
                                {/*        <Input type="select" name="studyprogram" >*/}
                                {/*            <option>Master Angewandte Informatik</option>*/}
                                {/*            <option>MasterComputer Engineering</option>*/}
                                {/*            <option>Master Angewandte Kognitions- und Medienwissenschaft</option>*/}
                                {/*        </Input>*/}

                                {/*    </FormGroup>*/}
                                {/*</Form>*/}
                                {/*<input type="select"*/}
                                {/*       className="form-control"*/}
                                {/*       name="studyprogram"*/}
                                {/*       placeholder="Study program"*/}
                                {/*       value={this.state.studyprogram}*/}
                                {/*       onChange={this.onChange}>*/}
                                {/*    <option>Master Angewandte Informatik</option>*/}
                                {/*    <option>MasterComputer Engineering</option>*/}
                                {/*    <option>Master Angewandte Kognitions- und Medienwissenschaft</option>*/}
                                {/*    <option><input type="text" className="form-control" placeholder="Other" /></option>*/}
                                {/*</input>*/}
                            </div>
                        </div>
                        <div className="col-md-6 right">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 left">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       placeholder="Enter Password"
                                       value={this.state.password}
                                       onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col-md-6 right">
                            <div className="form-group">
                                <label htmlFor="confirmpassword">Confirm Password</label>
                                <input type="password"
                                       className="form-control"
                                       name="confirmpassword"
                                       placeholder="Repeat Password"
                                       value={this.state.confirmpassword}
                                       onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 left">
                        </div>
                        <div className="col-md-6 right">
                            <div className="form-group">
                                <button type="submit" className="btn btn-lg btn-dark btn-primary btn-block">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register