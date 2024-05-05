import { useContext, useState } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";

const Register = () => {
  const [error, setError] = useState();
  const { registerUser , setLogInPerson} = useContext(authContext);

  const handleFormInput = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // For Password Authantication
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    } 
    if (password !== confirmPassword) {
      setError("Password did't match");
      return;
    }
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/|.,<>]).{8,}$/.test(password)  ){
      setError("Password must have one UpperCase, Number and Special characters ");  
      return;
    }

    setError('')

    console.log(name, email, password, confirmPassword);

    // if registration succcesful call SetLogINPerson otherwise call Error
    registerUser(email, password)
    .then(result=> setLogInPerson(result.user))
    .catch(err=> setError(err.message))
  };
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleFormInput}>
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>
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
            </div>
              {
                error && <small className="text-red-800 font-bold">{error}</small>
              }
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
