const axios = require('axios');
const fs = require('fs');
require('dotenv').config();


//for a more pleasant display of the timestamp
function formatTimestamp(date) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return date.toLocaleString(undefined, options);
  }


//return the status code
async function isApiRunning(apiUrl) {
  //start time for the time response
    const startTime = new Date();
  

    //schimbare cu .then + .catch
    try {
      const response = await axios.get(apiUrl);
      const responseStatus = response.status;
      const endTime = new Date();
      const responseTimeMs = endTime - startTime;

      return {
        statusCode: responseStatus,
        responseTime: responseTimeMs,
      };

    } catch (error) { 
      const endTime = new Date();
      const responseTimeMs = endTime - startTime;
  
      return {
        statusCode: 500,
        responseTime: responseTimeMs,
      };
    }
  }
  

//write the time and status code in a file
function logToFile(logMessage) {
    const timestamp = formatTimestamp(new Date());
    const logLine = `[${timestamp}] ${logMessage}\n`;
  
    fs.appendFile('api_logs.txt', logLine, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }

  const apiUrl = process.env.API_URL;

isApiRunning(apiUrl)
  .then((result) => {
    var message = 'API is not running or there is an error.';
    
    //if the API is running 
    if (result.statusCode === 200) {
      message = 'API is running.';
    }
    console.log(result.statusCode +' '+ result.responseTime+'ms '+ message);
    logToFile(result.statusCode +' '+ result.responseTime+'ms '+ message);
  })
  .catch((error) => {
    console.error('Error:', error.message);
    logToFile('Error: ', error.message);
  });
