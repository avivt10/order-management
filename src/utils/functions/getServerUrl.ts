export function getServerUrl(){
  if(process.env.NODE_ENV == 'production'){
    return "https://order-management-server.onrender.com"
  }
    return "http://localhost:3000"
  }