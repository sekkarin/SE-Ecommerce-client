/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaGooglePlusG, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";


const Modal = ({ name }) => {
  const { login, signUpWithGoogle } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        // Signed in
        const user = result.user;
        console.log(user);
        alert("Login success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSigUp = () => {
    signUpWithGoogle()
      .then((result) => {
        // Signed in with google
        const user = result.user;
        console.log(user);
        alert("Google SignUp Success");
        document.getElementById("login").close();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <dialog id={name} className="modal">
      <div className="modal-box">
        <form
          className="card-body flex flex-col justify-center text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg ">Please Login!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              {...register("password")}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Login"
              className="btn bg-red text-white"
            />
          </div>
          <p className="text-center my-2 ">
            Don't have an account ?
            <Link to="/signup" className="underline ml-1">
              {" "}
              Sign Up Now{" "}
            </Link>
          </p>
          <button
            htmlFor={name}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById(name).close()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="bg-red w-6 h-6 rounded-full text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </form>
        <div className="text-center space-x-3 mb-3">
          <button
            onClick={googleSigUp}
            className="btn btn-circle btn-ghost hover:bg-red hover:text-white"
          >
            <FaGooglePlusG />
          </button>
          <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;