// Register.jsx
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../main";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    data.phone = `+91${data.phone}`;
    console.log("Sending registration data:", data);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/me/register",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      navigateTo(`/otp-verification/${data.email}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed, please try again";
      toast.error(errorMessage);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div
      style={{
        paddingTop: "80px",
        paddingBottom: "40px",
        minHeight: "calc(100vh - 120px)",
      }}
      className="container d-flex justify-content-center align-items-start"
    >
      <form
        onSubmit={handleSubmit(handleRegister)}
        style={{
          width: "100%",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label fw-semibold"
            style={{ color: "rgba(13, 11, 11, 0.96)" }}
          >
            Full Name
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="name"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Name must not exceed 30 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name should only contain alphabets and spaces",
              },
            })}
            style={{
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(5px)",
              color: "#fff",
            }}
          />
          {errors.name && (
            <span className="text-danger mt-1 d-block">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label fw-semibold"
            style={{ color: "rgba(11, 8, 8, 0.96)" }}
          >
            Email
          </label>
          <input
            type="email"
            className="form-control form-control-lg"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            style={{
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(5px)",
              color: "#fff",
            }}
          />
          {errors.email && (
            <span className="text-danger mt-1 d-block">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="phone"
            className="form-label fw-semibold"
            style={{ color: "rgb(15, 14, 14)" }}
          >
            Phone Number
          </label>
          <div className="input-group">
            <span
              className="input-group-text"
              style={{
                backgroundColor: "rgba(4, 9, 5, 0.8)",
                color: "#fff",
                borderRadius: "10px 0 0 10px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              +91
            </span>
            <input
              type="tel"
              className="form-control form-control-lg"
              id="phone"
              placeholder="Enter your phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Invalid Indian phone number (must start with 6-9 and be 10 digits)",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
              })}
              style={{
                borderRadius: "0 10px 10px 0",
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(5px)",
                color: "#fff",
              }}
            />
          </div>
          {errors.phone && (
            <span className="text-danger mt-1 d-block">
              {errors.phone.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label fw-semibold"
            style={{ color: "rgba(10, 9, 9, 0.99)" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control form-control-lg"
            id="password"
            placeholder="Create a password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one uppercase, one lowercase, one number and one special character",
              },
            })}
            style={{
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(5px)",
              color: "#fff",
            }}
          />
          {errors.password && (
            <span className="text-danger mt-1 d-block">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="form-label fw-semibold"
            style={{ color: "rgba(12, 11, 11, 0.99)" }}
          >
            Verification Method
          </label>
          <div className="d-flex gap-4">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="emailVerification"
                value="email"
                {...register("verificationMethod", {
                  required: "Please select a verification method",
                })}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
              <label
                htmlFor="emailVerification"
                className="form-check-label"
                style={{ color: "rgb(12, 12, 12)" }}
              >
                Email
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="phoneVerification"
                value="phone"
                {...register("verificationMethod", {
                  required: "Please select a verification method",
                })}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
              <label
                htmlFor="phoneVerification"
                className="form-check-label"
                style={{ color: "rgba(6, 3, 3, 0.97)" }}
              >
                Phone
              </label>
            </div>
          </div>
          {errors.verificationMethod && (
            <span className="text-warning mt-1 d-block">
              {errors.verificationMethod.message}
            </span>
          )}
        </div>
        {/* Added Login Link */}
        <div className="mb-3 text-center">
          <span style={{ color: "rgba(255,255,255,0.7)", marginRight: "8px" }}>
            Already have an account?
          </span>
          <Link
            to="/auth"
            state={{ showLogin: true }}
            className="text-decoration-none fw-semibold"
            style={{
              color: "rgba(2, 2, 14, 0.9)",
              transition: "color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.color = "rgb(83, 203, 226)")}
            onMouseOut={(e) =>
              (e.target.style.color = "rgba(3, 14, 5, 0.9)")
            }
          >
            Login
          </Link>
        </div>
        <button
          type="submit"
          className="btn w-100 btn-lg"
          style={{
            backgroundColor: "rgba(66, 95, 240, 0.95)",
            color: "#fff",
            borderRadius: "10px",
            fontWeight: "600",
            transition: "background-color 0.3s ease",
            border: "none",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "rgba(26, 192, 189, 0.9)")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "rgba(66, 95, 240, 0.95)")
          }
        >
          Register Now
        </button>
      </form>
    </div>
  );
};

export default Register;
