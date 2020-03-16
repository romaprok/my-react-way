import React from 'react'
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../state/auth-reducer";
import {Redirect} from "react-router-dom";


const LoginForm = ({handleSubmit, error, captchaUrl}) =>{
    // debugger
    return (
        <form onSubmit={handleSubmit}>
               {createField('Email', 'email', [required], Input)}
               {createField('Password', 'password', [required], Input, {type:'password'})}
               {createField(null, 'rememberMe', [], Input, {type:'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl}/>}

            {captchaUrl && createField('symbols from image', 'captcha', [required], Input)}
            {error && <div className={'formSummaryError'}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth){
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state) => ({
    captchaUrl:state.auth.captchaUrl,
    isAuth:state.auth.isAuth
})
export default connect(mapStateToProps, {login} )(Login)