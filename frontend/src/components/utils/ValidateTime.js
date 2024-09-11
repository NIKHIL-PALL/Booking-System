function isIntervalWithinInterval(givenStart, givenEnd, startInterval, endInterval) {
    // Helper function to convert "HH:MM" to minutes since midnight
    function timeToMinutes(time) {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    }
  
    // Convert all times to minutes since midnight
    const startIntervalMinutes = timeToMinutes(startInterval);
    const endIntervalMinutes = timeToMinutes(endInterval);
    const givenStartMinutes = timeToMinutes(givenStart);
    const givenEndMinutes = timeToMinutes(givenEnd);
  
    // Handle normal and overnight intervals separately
    if (startIntervalMinutes <= endIntervalMinutes) {
      // Normal case: startInterval <= endInterval (same day)
      return givenStartMinutes >= startIntervalMinutes &&
             givenEndMinutes <= endIntervalMinutes;
    } else {
      // Overnight case: startInterval > endInterval (crosses midnight)
      // The given interval should either fully fit into the night part
      // or be fully within the daytime part
      const isInNightInterval = (givenStartMinutes >= startIntervalMinutes || givenStartMinutes < endIntervalMinutes) &&
                                (givenEndMinutes >= startIntervalMinutes || givenEndMinutes <= endIntervalMinutes);
      return isInNightInterval;
    }
  }
  
export default isIntervalWithinInterval;