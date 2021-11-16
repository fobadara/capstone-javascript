import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function sum(a, b) {
  return a + b;
}
export default sum;