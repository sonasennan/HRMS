
import { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployeeByIdData(employee_id));
  }, [dispatch, employee_id]);

  const handleBack = () => {
    navigate("/employee");
  };

  useEffect(() => {
    if (data) {
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
    }
  }, [data]);

  const generateVCard = () => {
    if (!data) return; // Ensure data is available before generating vCard

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
    <div className="vcard-container">
      <div className="vcard-details">
        <div className="card">
          <div className="card-header">
            <h2>Personal Details</h2>
          </div>
          <div className="card-body">
            {data && (
              <>
                <div className="detail-item">
                  <strong>Employee ID</strong> {data.employee_id}
                </div>
                <div className="detail-item">
                  <strong>Name</strong> {data.employee_name}
                </div>
                <div className="detail-item">
                  <strong>Address</strong> {data.address}
                </div>
                <div className="detail-item">
                  <strong>Phone Number</strong> {data.phone_number}
                </div>
                <div className="detail-item">
                  <strong>Email</strong> {data.email}
                </div>
              </>
            )}
          </div>
          <Button
              variant="outlined"
              style={{ color: 'black', borderColor: 'black' }}
              onClick={generateVCard}
            >
              Download vCard
            </Button>

          <Button variant='outlined' size='small' onClick={handleBack} disableElevation id="goBack">Go back</Button>
        </div>
      </div>

      {vCardString && (
        <div className="qr-code">
          <h2>Scan here</h2>
          <QRCode value={vCardString} size={256} />
        </div>
      )}
    </div>
  );
};

export default VCardGenerator;

