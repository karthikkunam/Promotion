// THIS is a temporary fix to reroute routes to BFF layer in Dev

let envEndpoint;
if (window.location.href.indexOf('localhost:3000') !== -1) {
  envEndpoint = 'http://localhost:5000';
} else {
  envEndpoint = '';
}
export default envEndpoint;
