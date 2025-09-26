import React, { Fragment } from "react";
import { signUpValidation } from "../validations/userValidation";
import { useNavigate } from "react-router-dom";
import { USER_API } from "../api/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${USER_API}/signup`;
    try {
      await signUpValidation.validate(signUpData, {
        abortEarly: false,
      });
      setIsSubmitting(true);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...signUpData,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        console.log("signup message check", responseData.message);
        navigate("/home");
      }
    } catch (error) {
      console.error("error", error);
      if (error.name === "ValidationError") {
        const formattedErrors = {};
        error.inner.forEach((e) => {
          formattedErrors[e.path] = e.message;
        });
        setErrors(formattedErrors);
      } else {
        console.error("API Error", error);
      }
    } finally {
      console.error("finally block executed");
    }
  };
  return (
    <Fragment>
      <div className="flex items-center justify-center min-h-screen bg-blue-200">
        <form className="bg-white p-6 rounded-2xl shadow-lg w-96 space-y-4">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Full Name"
            value={signUpData?.username ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleChange}
            value={signUpData?.email ?? ""}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="enter password"
            value={signUpData?.password ?? ""}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <select
            name="role"
            value={signUpData?.role ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </Fragment>
  );
}
