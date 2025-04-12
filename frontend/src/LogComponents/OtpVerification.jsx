// import { useContext, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Context } from "../main";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const OtpVerification = () => {
//   const { setIsAuthenticated, setUser, setToken } = useContext(Context);
//   const { email } = useParams();
//   const navigateTo = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const handleVerifyOtp = async (data) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/v1/user/verify-otp",
//         { email, otp: data.otp },
//         { withCredentials: true, headers: { "Content-Type": "application/json" } }
//       );
//       toast.success(res.data.message);
//       setIsAuthenticated(true);
//       setUser(res.data.user);
//       setToken(res.data.token);
//       navigateTo("/");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#e9f5e9" }}>
//       <div className="card p-4 shadow-lg border-0" style={{ width: "450px", borderRadius: "15px" }}>
//         <h2 className="text-center mb-4 text-success">Verify OTP</h2>
//         <form onSubmit={handleSubmit(handleVerifyOtp)}>
//           <div className="mb-3">
//             <label htmlFor="otp" className="form-label fw-semibold text-muted">Enter OTP</label>
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               id="otp"
//               placeholder="Enter the OTP sent to your email"
//               {...register("otp", { required: true })}
//             />
//             {errors.otp && <span className="text-danger">OTP is required</span>}
//           </div>
//           <button type="submit" className="btn btn-success w-100 btn-lg" disabled={loading}>
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;