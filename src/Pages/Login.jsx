import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../Components/AuthProvider/AuthProvider";

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const { loginUser, setLogInPerson, googleLogin, facebookLogin, LogInPerson } =
    useContext(authContext);

  // Grab the location and state , Now navigate to the desire page
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  // First see if user is logIn ,than take him where he clicked before to go
  useEffect(() => {
    if (LogInPerson) {
      navigate(location.state);
    }
  }, [LogInPerson]);

  // step 1: Handle LogIn Form Input

  const handleLoginFormInput = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setLoginError("");
    loginUser(email, password)
      .then((result) => {
        setLogInPerson(result.user)
        e.target.reset()
        navigate('/')
      })
      .catch(() => setLoginError("Email is not matched!"));
  };

  // step 2 : Handle google Login

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {setLogInPerson(result.user)})
      .catch(() => setLoginError("Google login Unsuccessful"));
  };

  // step 3 : Handle Facebook Login

  const handleFacebookLogin = () => {
    facebookLogin()
      .then((result) => setLogInPerson(result.user))
      .catch(() => setLoginError("Facebook login Unsuccessful"));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">LogIn Now</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLoginFormInput}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            {loginError && <small className="text-red-800">{loginError}</small>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className=" m-auto">
            {" "}
            <button
              className="btn btn-secondary m-2"
              onClick={handleGoogleLogin}
            >
              Google LogIn
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={handleFacebookLogin}
            >
              Facebook LogIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
