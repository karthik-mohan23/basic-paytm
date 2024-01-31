import FormButton from "../components/FormButton";
import FormHeading from "../components/FormHeading";
import FormInput from "../components/FormInput";

import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center bg-opacity-50">
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
            />
            <FormInput
              label="Last Name"
              placeholder="Enter your last name"
              type="text"
            />
            <FormInput
              label="Email"
              placeholder="yourname@gmail.com"
              type="email"
            />
            <FormInput
              label="Password"
              placeholder="password"
              type="password"
            />
            {/* Button */}
            <FormButton text="Sign Up" />
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
