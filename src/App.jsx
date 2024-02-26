// if you want to run this App.js 1 file please uncomment this and comment below code App.js 2 
// App.js 1

// import React, { useState } from 'react';
// import FormComponent from './components/FormComponent';
// import TableComponent from './components/TableComponent';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// const App  = () => {
//   const [entries, setEntries] = useState([]);

//   const handleFormSubmit = (formData) => {
//     setEntries(prevEntries => [...prevEntries, formData]);
//   };

//   return (
//     <div>
//       <FormComponent onSubmit={handleFormSubmit} />
//       <TableComponent entries={entries} />
      
//     </div>
//   );
// };
// export default App;

// -------------------------------------------------------------------------------------------------------------------

// App2.js  this is api response app file 

import React, { useState } from 'react';
import PostmanForm from './apicompo/PostmanForm';
import UserInfoForm from './apicompo/UserInfoForm';

const App = () => {
  const [step, setStep] = useState(1);

  const handlePostmanFormSubmit = () => {
    setStep(2);
  };

  return (
    <div>
      {step === 1 && <PostmanForm onNext={handlePostmanFormSubmit} />}
      {step === 2 && <UserInfoForm />}
    </div>
  );
};

export default App;
