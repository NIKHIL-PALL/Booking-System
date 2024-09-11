function convertTo12HourFormat(time) {
    // Split the time string into hours and minutes
    let [hours, minutes] = time.split(':').map(Number);
  
    // Determine if it's AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // The `% 12` converts 13-23 to 1-11, and 0 (midnight) to 12.
  
    // Return the formatted time
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
  
 
  export default convertTo12HourFormat;
  