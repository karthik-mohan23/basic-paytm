import { useState } from "react";
import FormButton from "../components/FormButton";
import FormHeading from "../components/FormHeading";
import FormInput from "../components/FormInput";

import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!username | !password) {
      return;
    }
    const signInData = {
      username,
      password,
    };
    const response = await axios.post("/api/v1/user/signin", signInData);
    console.log(response);
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center bg-opacity-50">
      <div className="max-w-[430px] mx-auto bg-white rounded-lg">
        <div className="p-10">
          {/* Heading */}
          <FormHeading
            title="Sign In"
            subTitle="Enter your credentials to access your account"
          />
          {/* end of Heading */}
          <div>
            <FormInput
              label="Email"
              placeholder="yourname@gmail.com"
              type="email"
              handleOnChange={(e) => setUsername(e.target.value)}
            />
            <FormInput
              label="Password"
              placeholder="password"
              type="password"
              handleOnChange={(e) => setPassword(e.target.value)}
            />
            {/* Button */}
            <FormButton text="Sign In" handleOnClick={handleSignInSubmit} />
            {/* Sub text */}
            <p className="text-center mt-2">
              Don't have an account?{" "}
              <Link className="font-semibold underline" to="/signup">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
