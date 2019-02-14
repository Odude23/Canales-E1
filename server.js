//Exam #1
var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
    var result = {};
    if (query['cmd'] == 'calcDistance')
    {
      console.log("Handling a request");
      console.log(query);
      result = calcDistance(query);
    }
    else if (query['cmd'] == 'calcCost')
    {
      console.log("Handling a request");
      console.log(query);
      result = calcCost(query);
    }   
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function calcDistance(query)
{
  if (query['budget'] == undefined || query['budget'] < 0)  
    throw Error("Invalid value for budget");
  else
  {
    var budget = query['budget'];
  }
  
  if (query['mpg'] == undefined || query['mpg'] < 0)  
    throw Error("Invalid value for mpg");
  else
  {
    var mpg = query['mpg'];
  }
  
  if (query['fuelCost'] == undefined || query['fuelCost'] < 0)  
    throw Error("Invalid value for fuelCost");
  else
  {
    var fuelCost = query['fuelCost'];
  }
  
  var total = ((budget/fuelCost) * mpg);
  return total;
}


function calcCost(query)
{
  if (query['distance'] == undefined || query['distance'] < 0)  
    throw Error("Invalid value for distance");
  else
  {
    var distance = query['distance'];
  }
  if (query['mpg'] == undefined || query['mpg'] < 0)  
    throw Error("Invalid value for mpg");
  else
  {
    var mpg = query['mpg'];
  }
  if (query['fuelCost'] == undefined || query['fuelCost'] < 0)  
    throw Error("Invalid value for fuelCost");
  else
  {
    var fuelCost = query['fuelCost'];
  }
    
  var result = ((distance/mpg)*fuelCost); 
  return result;
}