import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:3001";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    useEffect(() => {
        console.log('inside useEffect');
    }, []);
    async function onSubmitHandler(e) {
        e.preventDefault();
        console.log('form: ', form);
        const url = BASE_URL + '/login';
        try {
            if (window.grecaptcha) {
                window.grecaptcha.ready(async function () {
                    const token = await window.grecaptcha.execute('', { action: 'submit' });
                    const response = await axios.post(url, { ...form, token }, { timeout: 3000 });
                    const data = response.data;
                    console.log("onSubmitHandler -> data", data)
                });
            }

        } catch (error) {
            console.error('error: ', error);
        }
    }
    function onChangeHandler(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    return <Fragment>
        <form onSubmit={onSubmitHandler}>
            <input type="text" name="username" value={form.username} onChange={onChangeHandler} />
            <input type="password" name="password" value={form.password} onChange={onChangeHandler} />
            <button>Submit</button>
        </form>
    </Fragment>
}
export default Login;