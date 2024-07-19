
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getEmployeeByIdData } from '../../store/employeeById';


// const EmployeeCard = () => {
//   const { employee_id } = useParams();
//   const dispatch = useDispatch();
//   const { status, data, error } = useSelector((state) => state.employeeById);

//   useEffect(() => {
//     dispatch(getEmployeeByIdData(employee_id));
//   }, [dispatch, employee_id]);

//   if (status === 'loading') {
//     return <div className="card loading">Loading...</div>;
//   }

//   if (status === 'failed') {
//     return (
//       <div className="card error">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h2>Personal Details</h2>
//       </div>
//       <div className="card-body">
//         {data && (
//           <>
//             <div className="detail-item">
//               <strong>Employee ID:</strong> {data.employee_id}
//             </div>
//             <div className="detail-item">
//               <strong>Name:</strong> {data.employee_name}
//             </div>
//             <div className="detail-item">
//               <strong>Address:</strong> {data.address}
//             </div>
//             <div className="detail-item">
//               <strong>Phone Number:</strong> {data.phone_number}
//             </div>
//             <div className="detail-item">
//               <strong>Email:</strong> {data.email}
//             </div>
//             <div className="detail-item">
//               <strong>Leave Taken:</strong> {data.leave_taken}
//             </div>
//             <div className="detail-item">
//               <strong>Designation ID:</strong> {data.des_id}
//             </div>
//             <div className="detail-item">
//               <strong>Designation Name:</strong> {data.des_name}
//             </div>
//             <div className="detail-item">
//               <strong>Maximum Leave:</strong> {data.maximum_leave}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeCard;



// ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import vCardsJS from 'vcards-js';
import QRCode from 'react-qr-code';
import Button from '@mui/material/Button';
import { getEmployeeByIdData } from '../../store/employeeById';
import { useNavigate } from 'react-router-dom';

const VCardGenerator = () => {
  const { employee_id } = useParams();
  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.employeeById);
  const [vCardString, setVCardString] = useState('');

  // Fetch employee data on component mount
  React.useEffect(() => {
    dispatch(getEmployeeByIdData(employee_id));
  }, [dispatch, employee_id]);
  const navigate=useNavigate()
  const handleBack =() => {
    navigate("/employee")
  }
 
  // Generate vCard function
  const generateVCard = () => {
    if (!data) return; // Ensure data is available before generating vCard

    // Create a new vCard
    const vCard = vCardsJS();
    // Set properties
    vCard.firstName = data.employee_name;
    vCard.organization = 'Hamon Technologies'; // Add organization if available
    vCard.workPhone = data.phone_number;
    vCard.title = data.des_name;
    vCard.email = data.email;
    vCard.address = data.address;

    // Generate the vCard string
    const vCardString = vCard.getFormattedString();
    setVCardString(vCardString);

    // Create a Blob from the vCard string
    const blob = new Blob([vCardString], { type: 'text/vcard' });

    // Use file-saver to save the vCard
    saveAs(blob, `${data.employee_name}.vcf`);
  };

  if (status === 'loading') {
    return <div className="card loading">Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="card error">
        Error: {error}
      </div>
    );
  }

  return (
    <>
    <div className="card">
      <div className="card-header">
        <h2>Personal Details</h2>
      </div>
      <div className="card-body">
        {data && (
          <>
            <div className="detail-item">
              <strong>Employee ID:</strong> {data.employee_id}
            </div>
            <div className="detail-item">
              <strong>Name:</strong> {data.employee_name}
            </div>
            <div className="detail-item">
              <strong>Address:</strong> {data.address}
            </div>
            <div className="detail-item">
              <strong>Phone Number:</strong> {data.phone_number}
            </div>
            <div className="detail-item">
              <strong>Email:</strong> {data.email}
            </div>

          </>
        )}
      </div>
      <Button variant="outlined" color="primary" onClick={generateVCard}>Download vCard</Button>
      
      {vCardString && (
        <div>
          <h2>Scan this QR Code to get the contact details:</h2>
          <QRCode value={vCardString} size={256} />
        </div>
      )}
    </div>
    <Button variant='outlined' size='small' onClick={handleBack} disableElevation id="goBack">Go back</Button>
    </>
    
  );
};

export default VCardGenerator;
