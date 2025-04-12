// import { useState } from 'react';
// import axios from 'axios';

// const Books = () => {
//   const [formData, setFormData] = useState({
//     category: '',
//     itemName: '',
//     description: '',
//     condition: '',
//     location: '',
//     type: 'donate', // donate or exchange
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/books', formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       console.log('Book submitted:', response.data);
//       alert('Book submitted successfully!');
//     } catch (err) {
//       console.error('Error submitting book:', err.response?.data || err.message);
//       alert('Failed to submit book. Please try again.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Books Donation/Exchange</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <select
//             name="category"
//             className="form-select"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="school">School Books</option>
//             <option value="college">College Books</option>
//             <option value="notes">Notes & Guides</option>
//             <option value="stationery">Stationery</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Item Name</label>
//           <input
//             type="text"
//             name="itemName"
//             className="form-control"
//             value={formData.itemName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             name="description"
//             className="form-control"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Condition</label>
//           <select
//             name="condition"
//             className="form-select"
//             value={formData.condition}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Condition</option>
//             <option value="new">New</option>
//             <option value="used">Used - Good Condition</option>
//             <option value="fair">Used - Fair Condition</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Location</label>
//           <input
//             type="text"
//             name="location"
//             className="form-control"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Type</label>
//           <select
//             name="type"
//             className="form-select"
//             value={formData.type}
//             onChange={handleChange}
//             required
//           >
//             <option value="donate">Donate</option>
//             <option value="exchange">Exchange</option>
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Books;