// import { useContext, useState } from "react";
// import "../styles/OtpVerification.css";
// import axios from "axios";
// import { Navigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Context } from "../main";

// const OtpVerification = () => {
//   const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
//   const { email, phone } = useParams();
//   const [otp, setOtp] = useState(["", "", "", "", ""]);

//   const handleChange = (value, index) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < otp.length - 1) {
//       document.getElementById(`otp-input-${index + 1}`).focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       document.getElementById(`otp-input-${index - 1}`).focus();
//     }
//   };

//   const handleOtpVerification = async (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join("");
//     const data = {
//       email,
//       otp: enteredOtp,
//       phone,
//     };
//     await axios
//       .post("http://localhost:5000/api/v1/user/otp-verification", data, {
//         withCredentials: true,
//         headers: { "Content-Type": "application/json" },
//       })
//       .then((res) => {
//         toast.success(res.data.message);
//         setIsAuthenticated(true);
//         setUser(res.data.user);
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//         setIsAuthenticated(false);
//         setUser(null);
//       });
//   };

//   if (isAuthenticated) {
//     return <Navigate to={"/"} />;
//   }

//   return (
//     <>
//       <div className="otp-verification-page">
//         <div className="otp-container">
//           <h1>OTP Verification</h1>
//           <p>Enter the 5-digit OTP sent to your registered email or phone.</p>
//           <form onSubmit={handleOtpVerification} className="otp-form">
//             <div className="otp-input-container">
//               {otp.map((digit, index) => {
//                 return (
//                   <input
//                   id={`otp-input-${index}`}
//                     type="text"
//                     maxLength="1"
//                     key={index}
//                     value={digit}
//                     onChange={(e) => handleChange(e.target.value, index)}
//                     onKeyDown={(e) => handleKeyDown(e, index)}
//                     className="otp-input"
//                   />
//                 );
//               })}
//             </div>
//             <button type="submit" className="verify-button">
//               Verify OTP
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OtpVerification;

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OtpVerification = () => {
  const { setIsAuthenticated, setUser, setToken } = useContext(Context);
  const { email } = useParams();
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleVerifyOtp = async (data) => {
    setLoading(true);
    const payload = { email, otp: data.otp };
    console.log("Sending OTP verification data:", payload);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/verify-otp",
        payload,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      console.log("OTP verification successful:", res.data);
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      setToken(res.data.token);
      navigateTo("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "OTP verification failed, please try again";
      console.error("OTP verification error:", error.response?.data || error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#e9f5e9" }}>
      <div className="card p-4 shadow-lg border-0" style={{ width: "450px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-success">Verify OTP</h2>
        <form onSubmit={handleSubmit(handleVerifyOtp)}>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label fw-semibold text-muted">Enter OTP</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="otp"
              placeholder="Enter the OTP sent to your email"
              {...register("otp", { required: true })}
            />
            {errors.otp && <span className="text-danger">OTP is required</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 btn-lg" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;