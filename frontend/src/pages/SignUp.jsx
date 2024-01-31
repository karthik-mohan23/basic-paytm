import { useState } from "react";
import FormButton from "../components/FormButton";
import FormHeading from "../components/FormHeading";
import FormInput from "../components/FormInput";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignUpSubmit() {
    if (!firstName || !lastName || !userName || !password) {
      return;
    }
    const signUpData = {
      firstName,
      lastName,
      username: userName,
      password,
    };
    const response = await axios.post("/api/v1/user/signup", signUpData);
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  }

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center bg-opacity-50">
      <div className="max-w-[430px] mx-auto bg-white rounded-lg">
        <div className="p-10">
          {/* Heading */}
          <FormHeading
            title="Sign Up"
            subTitle="Enter your information to create an account"
          />
          {/* end of Heading */}
          <div>
            {/* Input  */}
            <FormInput
              label="First Name"
              placeholder="Enter your first name"
              type="text"
              handleOnChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              label="Last Name"
              placeholder="Enter your last name"
              type="text"
              handleOnChange={(e) => setLastName(e.target.value)}
            />
            <FormInput
              label="Email"
              placeholder="yourname@gmail.com"
              type="email"
              handleOnChange={(e) => setUserName(e.target.value)}
            />
            <FormInput
              label="Password"
              placeholder="password"
              type="password"
              handleOnChange={(e) => setPassword(e.target.value)}
            />
            {/* Button */}
            <FormButton text="Sign Up" handleOnClick={handleSignUpSubmit} />
            {/* Sub text */}
            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link className="font-semibold underline" to="/signin">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
