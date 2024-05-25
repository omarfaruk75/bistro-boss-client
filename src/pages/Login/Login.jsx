import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from "react-router"

import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {

    const { signIn } = useAuth();
    const [disabled, setDisabled] = useState(true)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // const login = { email, password }
        // console.log(login);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Success',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })

                navigate(from, { replace: true });
            })


    }
    const handleValidateCaptcha = e => {
        const user_captcha_value = e.target.value;

        if (validateCaptcha(user_captcha_value)) {
            alert('Captcha Matched');
            setDisabled(false)
        }

        else {
            alert('Captcha Does Not Match');
            setDisabled(true)
        }
    }



    return (
        <div>
            <Helmet>
                <title>Bistro Boss Restaurant || Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" placeholder="Recaptha" name="captha" className="input input-bordered" required />
                                <button className="btn btn-outline btn-secondary btn-sm mt-2">Validate</button>
                            </div>
                            <div className="form-control mt-6">
                                {/*todo:  for rechaptha inactive   disabled={disabled} */}
                                <button disabled={false} className="btn btn-primary">Login</button>
                            </div>


                        </form>
                        <div className='flex felx-row items-center justify-center pb-2'> <SocialLogin></SocialLogin></div>
                        <p className='pb-12 text-center'><small>New Here? <Link className='text-blue-600 font-medium' to='/register'>Create An Account</Link></small> </p>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;