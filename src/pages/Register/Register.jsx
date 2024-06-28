
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router"
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { useAxiosPublic } from "../../Hooks/useAxiosPublic";


const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: "user",
                            status: "pending"
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data) {
                                    reset();
                                    navigate('/login')
                                    Swal.fire({
                                        title: 'Success',
                                        text: 'User Created Successfully',
                                        icon: 'success',
                                        confirmButtonText: 'Cool'
                                    })

                                }
                            })


                    }).catch(error => console.log(error))
            })
    }


    return (
        <div>
            <Helmet>
                <title>Bistro Boss Restaurant || Register</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Full Name" name="name" className="input input-bordered" />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" {...register("email", { required: true })} name="email" className="input input-bordered" />
                                {errors.email && <span>This field is required</span>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                                    name="password" className="input input-bordered" required />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}

                                {errors.password && <span>Password is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>


                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Register" />

                            </div>
                        </form>
                        <div className='flex felx-row items-center justify-center pb-2'> <SocialLogin></SocialLogin></div>
                        <p className='pb-12 text-center'><small>Already Have An Account? <Link className='text-blue-600 font-medium' to='/login'>Please Login</Link></small> </p>


                    </div>
                </div>
            </div>
        </div>
    );
};



export default Register;