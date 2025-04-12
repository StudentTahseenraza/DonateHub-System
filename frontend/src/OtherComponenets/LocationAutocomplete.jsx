// import { useEffect, useRef } from 'react';

// const LocationAutocomplete = ({ onPlaceSelected }) => {
//   const autocompleteRef = useRef(null);

//   useEffect(() => {
//     const autocomplete = new window.google.maps.places.Autocomplete(
//       autocompleteRef.current,
//       { types: ['geocode'] }
//     );
//     autocomplete.addListener('place_changed', () => {
//       const place = autocomplete.getPlace();
//       onPlaceSelected(place.formatted_address);
//     });
//   }, []);

//   return (
//     <input
//       ref={autocompleteRef}
//       type="text"
//       placeholder="Enter location"
//       className="form-control"
//     />
//   );
// };

// export default LocationAutocomplete;