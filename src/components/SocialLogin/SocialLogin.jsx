import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAxiosPublic } from "../../Hooks/useAxiosPublic";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'user',
                    status: "verified"
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res);
                        if (res.data) {
                            navigate('/');
                            Swal.fire({
                                title: 'Success',
                                text: 'User Created Successfully',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })

                        }

                    })


            }).catch(error => console.log(error))
    }


    return (
        <div>
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className='center flex flex-row items-center justify-center gap-2'><FaGoogle></FaGoogle> Google</button>
        </div>
    );
};

export default SocialLogin;