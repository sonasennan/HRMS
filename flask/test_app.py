import unittest
from app import app,db
from models import HR,Designation,Employee, init_db
from flask import json
from unittest.mock import patch
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timezone
from flask_testing import TestCase


class LoginTestCase(unittest.TestCase):

    def setUp(self):
        """Set up the test environment"""
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

      
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        db.create_all()

        # Create a test HR user with hashed password
        self.test_user = HR(username='test_user')
        self.test_user.set_password('password')  
        db.session.add(self.test_user)
        db.session.commit()

    def tearDown(self):
        """Tear down the test environment"""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_successful_login(self):
        """Test successful login scenario"""
        login_data = {'username': 'test_user', 'password': 'password'}

        with patch('models.HR.query') as mock_query:
            mock_query.filter_by.return_value.first.return_value = self.test_user

            # Send a POST request to /login with correct credentials
            response = self.app.post('/login', json=login_data)

           
            print(response.data.decode('utf-8'))

            # Assert response
            self.assertEqual(response.status_code, 200, "Expected status code 200, but got {}".format(response.status_code))
            self.assertIn(b'Login successful', response.data)

    def test_incorrect_password_login(self):
        """Test login with incorrect password"""
        login_data = {'username': 'test_user', 'password': 'wrong_password'}

        with patch('models.HR.query') as mock_query:
            mock_query.filter_by.return_value.first.return_value = self.test_user

            # Send a POST request to /login with incorrect password
            response = self.app.post('/login', json=login_data)

          
            print(response.data.decode('utf-8'))

            # Assert response
            self.assertEqual(response.status_code, 401, "Expected status code 401 (Unauthorized), but got {}".format(response.status_code))
            self.assertIn(b'Incorrect username or password', response.data)

    def test_nonexistent_user_login(self):
        """Test login with nonexistent username"""
        login_data = {'username': 'nonexistent_user', 'password': 'password'}

        with patch('models.HR.query') as mock_query:
            mock_query.filter_by.return_value.first.return_value = None

            # Send a POST request to /login with nonexistent username
            response = self.app.post('/login', json=login_data)

         
            print(response.data.decode('utf-8'))

            # Assert response
            self.assertEqual(response.status_code, 401, "Expected status code 401 (Unauthorized), but got {}".format(response.status_code))
            self.assertIn(b'Incorrect username or password', response.data)


class LogoutTestCase(unittest.TestCase):

    def setUp(self):
        """Set up the test environment"""
        self.app = app.test_client()  # Create a test client for the Flask application
        self.app_context = app.app_context()
        self.app_context.push()  # Push the application context to activate it

    def tearDown(self):
        """Tear down the test environment"""
        self.app_context.pop()  # Pop the application context to clean up resources

    def test_logout(self):
        """Test logout endpoint with active session"""
        with self.app as client:
            
            with client.session_transaction() as sess:
                sess['user_id'] = 1  # Mocking some session data

            # Send a POST request to /logout
            response = client.post('/logout')

            # Assert response
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Logged out successfully', response.data)



class AddDesignationTestCase(unittest.TestCase):

    def setUp(self):
        """Set up the test environment"""
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

        # Use in-memory SQLite for testing
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        db.create_all()

    def tearDown(self):
        """Tear down the test environment"""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()



    def test_add_designation_success(self):
        """Test adding a new designation successfully"""
        designation_data = {'designation_name': 'Manager', 'maximum_leave': 20}

        response = self.app.post('/designation', json=designation_data)

        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Designation added successfully!', response.data)



    def test_missing_designation_name(self):
        """Test handling when designation_name is missing"""
        designation_data = {'maximum_leave': 20}

        response = self.app.post('/designation', json=designation_data)

        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Designation name is required', response.data)



    def test_designation_already_exists(self):
        """Test handling when designation_name already exists"""
        # Create a designation initially
        initial_data = {'designation_name': 'Manager', 'maximum_leave': 20}
        self.app.post('/designation', json=initial_data)

        # Try to add the same designation again
        duplicate_data = {'designation_name': 'Manager', 'maximum_leave': 30}
        response = self.app.post('/designation', json=duplicate_data)

        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Designation name already exists', response.data)



    def test_missing_maximum_leave(self):
        """Test handling when maximum_leave is missing"""
        designation_data = {'designation_name': 'Supervisor'}

        response = self.app.post('/designation', json=designation_data)

        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Leave is required', response.data)


    def test_method_not_allowed(self):
        """Test handling when method other than POST is used"""
        response = self.app.get('/designation')

        self.assertEqual(response.status_code, 405)
        self.assertIn(b'Method Not Allowed', response.data)

        # Debug: Print response data for troubleshooting
        print(response.data.decode('utf-8'))  


class ListDesignationTestCase(unittest.TestCase):

    def setUp(self):
        """Set up the test environment"""
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()  # Push the application context

        # Set up an in-memory SQLite database
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        db.create_all()

    def tearDown(self):
        """Tear down the test environment"""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()  # Pop the application context

    def test_list_designations(self):
        """Test listing designations when there are designations in the database"""

        # Create some test designations
        designation1 = Designation(designation_name='Manager', maximum_leave=20)
        designation2 = Designation(designation_name='Engineer', maximum_leave=15)
        db.session.add(designation1)
        db.session.add(designation2)
        db.session.commit()

        # Send a GET request to /designations
        response = self.app.get('/designations')

        # Assert response
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(data), 2)  # Ensure two designations are returned
        self.assertEqual(data[0]['designation_name'], 'Manager')
        self.assertEqual(data[1]['designation_name'], 'Engineer')

    def test_no_designations(self):
        """Test listing designations when there are no designations in the database"""

        # Send a GET request to /designations
        response = self.app.get('/designations')

        # Assert response
        self.assertEqual(response.status_code, 404)
        self.assertIn(b'No designations found', response.data)
    def test_invalid_request_method(self):
            """Test handling when method other than GET is used"""

            # Send a POST request to /designations
            response = self.app.post('/designations')

            # Assert response
            self.assertEqual(response.status_code, 405)
            self.assertIn(b'Method Not Allowed', response.data)

    def test_deleted_designations_filtered_out(self):
        """Test that deleted designations are not included in the response"""

        # Create some test designations
        designation1 = Designation(designation_name='Manager', maximum_leave=20)
        designation2 = Designation(designation_name='Engineer', maximum_leave=15)
        designation3 = Designation(designation_name='Supervisor', maximum_leave=18, deleted_at=datetime.utcnow())
        db.session.add_all([designation1, designation2, designation3])
        db.session.commit()

        # Send a GET request to /designations
        response = self.app.get('/designations')

        # Assert response
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(data), 2)  # Ensure only two non-deleted designations are returned
        self.assertEqual(data[0]['designation_name'], 'Manager')
        self.assertEqual(data[1]['designation_name'], 'Engineer')





class UpdateDesignationTestCase(unittest.TestCase):

    def setUp(self):
        """Set up the test environment"""
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()

        # Push the application context
        self.app_context = app.app_context()
        self.app_context.push()

        # Create all tables
        db.create_all()

        # Create a test designation in the database
        test_designation = Designation(designation_name='Engineer', maximum_leave=20)
        db.session.add(test_designation)
        db.session.commit()

    def tearDown(self):
        """Tear down the test environment"""
        # Remove all data from the session
        db.session.remove()

        # Drop all tables
        db.drop_all()

        # Pop the application context
        self.app_context.pop()

    def test_update_designation_success(self):
        """Test updating an existing designation successfully"""
        # Prepare JSON data for update
        json_data = {'designation_name': 'Senior Engineer', 'maximum_leave': 25}

        # Send a PUT request to update the designation with id=1
        response = self.app.put('/update_designation/1', json=json_data)

        # Assert response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {'message': 'Designation updated successfully'})

        # Check if the designation was actually updated in the database
        updated_designation = Designation.query.get(1)
        self.assertEqual(updated_designation.designation_name, 'Senior Engineer')
        self.assertEqual(updated_designation.maximum_leave, 25)

    def test_designation_not_found(self):
        """Test updating a designation that does not exist"""
        # Prepare JSON data for update
        json_data = {'designation_name': 'Senior Engineer', 'maximum_leave': 25}

        # Send a PUT request to update a non-existent designation with id=2
        response = self.app.put('/update_designation/2', json=json_data)

        # Assert response
        self.assertEqual(response.status_code, 404)
        self.assertEqual(json.loads(response.data), {'message': 'Designation not found'})

    def test_nil_field(self):
        """Test updating a designation with a nil (empty string) field"""
        # Prepare JSON data with empty designation_name
        json_data = { 'maximum_leave': 25}

        # Send a PUT request to update the designation with id=1
        response = self.app.put('/update_designation/1', json=json_data)

        # Assert response
        self.assertEqual(response.status_code, 404)
        self.assertIn('Invalid input for field: designation_name', json.loads(response.data)['message'])




class GetDesignationByIdTestCase(unittest.TestCase):

    def setUp(self):
        """Set up the test environment"""
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()

        # Create a test designation in the database
        test_designation = Designation(designation_name='Manager', maximum_leave=20)
        db.session.add(test_designation)
        db.session.commit()

    def tearDown(self):
        """Tear down the test environment"""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_get_existing_designation(self):
        """Test retrieving an existing designation by ID"""
        response = self.app.get('/designation/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['designation_name'], 'Manager')
        self.assertEqual(data['maximum_leave'], 20)

    def test_get_non_existing_designation(self):
        """Test retrieving a designation that does not exist"""
        response = self.app.get('/designation/999')
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['error'], 'Not found')

    def test_get_invalid_designation_id(self):
        """Test retrieving a designation with an invalid ID format"""
        response = self.app.get('/designation/abc')
        self.assertEqual(response.status_code, 404)
        self.assertIn(b'Not Found', response.data)





class DeleteDesignationTestCase(unittest.TestCase):

    def setUp(self):
        """ Set up the test environment """
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()

        with app.app_context():
            db.create_all()

            # Add a test designation to the database
            test_designation = Designation(designation_id=1, designation_name='Test Designation', maximum_leave=20)
            db.session.add(test_designation)
            db.session.commit()

    def tearDown(self):
        """ Tear down the test environment """
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_delete_designation(self):
        """ Test deleting an existing designation """

        # Send a POST request to delete the designation with ID 1
        response = self.app.post('/delete_designation/1')

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'], 'Designation deleted successfully')




class TestAddEmployeeEndpoints(unittest.TestCase):

    def setUp(self):
        """Set up test client and database tables before each test."""
        self.app = app.test_client()
        app.config['TESTING'] = True  # Enable testing mode
        with app.app_context():
            db.create_all()
            test_designation=Designation(designation_name='Manager',maximum_leave=12)
            db.session.add(test_designation)
            db.session.commit()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_add_employee_success(self):
        """Test adding an employee with all required fields."""
        employee_data = {
            'employee_name': 'John Doe',
            'address': '123 Main St, Anytown',
            'phone_number': '555-1234',
            'email': 'john.doe@example.com',
            'des_name': 'Manager'
        }
        response = self.app.post('/employee', json=employee_data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json['message'], 'Employee added successfully')

    def test_missing_employee_name(self):
        """Test adding an employee with missing employee_name field."""
        employee_data = {
            'address': '123 Main St, Anytown',
            'phone_number': '555-1234',
            'email': 'john.doe@example.com',
            'des_name': 'Manager'
        }
        response = self.app.post('/employee', json=employee_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing or empty required field: employee_name', response.json['message'])

    def test_empty_designation_name(self):
        """Test adding an employee with empty des_name field."""
        employee_data = {
            'employee_name': 'John Doe',
            'address': '123 Main St, Anytown',
            'phone_number': '555-1234',
            'email': 'john.doe@example.com',
            'des_name': ''
        }
        response = self.app.post('/employee', json=employee_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing or empty required field: des_name', response.json['message'])

    def test_nil_address_field(self):
        """Test adding an employee with a nil (empty string) address field."""
        employee_data = {
            'employee_name': 'John Doe',
            'address': '',
            'phone_number': '555-1234',
            'email': 'john.doe@example.com',
            'des_name': 'Manager'
        }
        response = self.app.post('/employee', json=employee_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing or empty required field: address', response.json['message'])

    def test_nil_phone_number(self):
        """Test adding an employee with a nil (empty string) phone_number field."""
        employee_data = {
            'employee_name': 'John Doe',
            'address': '123 Main St, Anytown',
            'phone_number': '',
            'email': 'john.doe@example.com',
            'des_name': 'Manager'
        }
        response = self.app.post('/employee', json=employee_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing or empty required field: phone_number', response.json['message'])

    def test_nil_email_field(self):
        """Test adding an employee with a nil (empty string) email field."""
        employee_data = {
            'employee_name': 'John Doe',
            'address': '123 Main St, Anytown',
            'phone_number': '555-1234',
            'email': '',
            'des_name': 'Manager'
        }
        response = self.app.post('/employee', json=employee_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing or empty required field: email', response.json['message'])


class TestListEmployeeEndpoint(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        return app

    def setUp(self):
        db.create_all()

        # Create test designations
        manager = Designation(designation_name='Manager', maximum_leave=15)
        engineer = Designation(designation_name='Engineer', maximum_leave=20)
        db.session.add_all([manager, engineer])
        db.session.commit()

        # Create test employees
        john = Employee(employee_name='John Doe', address='123 Main St', phone_number='555-1234',
                        email='john.doe@example.com', des_id=manager.designation_id)
        jane = Employee(employee_name='Jane Smith', address='456 Elm St', phone_number='555-5678',
                        email='jane.smith@example.com', des_id=engineer.designation_id)
        deleted_employee = Employee(employee_name='Deleted Employee', address='789 Oak St', phone_number='555-9999',
                                    email='deleted.employee@example.com', des_id=manager.designation_id,
                                    deleted_at=datetime.utcnow())

        db.session.add_all([john, jane,deleted_employee])
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_list_all_employees(self):
        response = self.client.get('/employees')
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertEqual(len(data), 2) 
        

    def test_no_employees_found(self):
        Employee.query.delete()
        db.session.commit()
        
        response = self.client.get('/employees')
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertEqual(data, [])  

    def test_list_all_employees_with_deleted(self):
        deleted_employee = Employee.query.filter_by(employee_name='Deleted Employee').first()
        deleted_employee.deleted_at = datetime.utcnow()
        db.session.commit()

        response = self.client.get('/employees')
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertEqual(len(data), 2)  # Expecting 2 employees (1 active and 1 deleted)
      


 


class DeleteEmployeeTestCase(unittest.TestCase):

    def setUp(self):
        """ Set up the test environment """
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()

        with app.app_context():
            db.create_all()

            # Add a test designation to the database
            test_designation = Designation(designation_id=3, designation_name='Test Designation', maximum_leave=20)
            db.session.add(test_designation)
            db.session.commit()

            # Add a test employee to the database
            test_employee = Employee(employee_id=1, employee_name='Test Employee', address='123 Test St', phone_number='12345678', email='test@example.com', leave_taken=2, des_id=3)
            db.session.add(test_employee)
            db.session.commit()

    def tearDown(self):
        """ Tear down the test environment """
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_delete_employee(self):
        """ Test deleting an existing employee """

        # Send a POST request to delete the employee with ID 1
        response = self.app.post('/delete_employee/1')

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['message'], 'Employee deleted successfully')

   
        with app.app_context():
            deleted_employee = Employee.query.get(1)
            self.assertIsNotNone(deleted_employee.deleted_at)




class GetEmployeeByIdTestCase(unittest.TestCase):

    def setUp(self):
        """ Set up the test environment """
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()

        with app.app_context():
            db.create_all()

            # Create a test designation in the database
            test_designation = Designation(designation_id=1, designation_name='Manager', maximum_leave=20)
            db.session.add(test_designation)

            # Create a test employee in the database
            test_employee = Employee(employee_id=1, employee_name='Test Employee', address='123 Test St', phone_number='12345678', email='test@example.com', leave_taken=2, des_id=1)
            db.session.add(test_employee)

            db.session.commit()

    def tearDown(self):
        """ Tear down the test environment """
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_existing_employee(self):
        """ Test retrieving an existing employee by ID """
        response = self.app.get('/employee/1')

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data.decode('utf-8'))

        self.assertEqual(data['employee_name'], 'Test Employee')
        self.assertEqual(data['address'], '123 Test St')
        self.assertEqual(data['phone_number'], '12345678')
        self.assertEqual(data['email'], 'test@example.com')
        self.assertEqual(data['leave_taken'], 2)
        self.assertEqual(data['des_id'], 1)
        self.assertEqual(data['des_name'], 'Manager')
        self.assertEqual(data['maximum_leave'], 20)

    def test_get_non_existing_employee(self):
        """ Test retrieving an employee that does not exist """
        response = self.app.get('/employee/999')

        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data.decode('utf-8'))

        self.assertEqual(data['error'], 'Employee not found')

    def test_get_invalid_employee_id(self):
        """ Test retrieving an employee with an invalid ID format """
        response = self.app.get('/employee/abc')

        self.assertEqual(response.status_code, 404)
        self.assertIn(b'Not Found', response.data)



class TestUpdateEmployeeEndpoint(unittest.TestCase):
    def setUp(self):
        self.app_context = app.app_context()
        self.app_context.push()
        self.client = app.test_client()
        self.client.testing = True
        db.create_all()
        test_designation = Designation(designation_name='Manager',maximum_leave=15)
        db.session.add(test_designation)
        db.session.commit()
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()    
        
    def test_update_employee_success(self):        
        test_employee= Employee(employee_name='john',address="tvm",phone_number="554744",email="john@gamil.com",des_id=1)
        db.session.add(test_employee)
        db.session.commit()        
        response = self.client.put('/update_employee/1',json={"employee_name":'John Honai',"address":"tvm","phone_number":"554744","email":"john@gamil.com","leave_taken":0,"des_name":"Manager" })        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['message'],'Employee updated successfully')  

    def test_update_employee_designation_not_found(self):        
        test_employee= Employee(employee_name='john',address="tvm",phone_number="554744",email="john@gamil.com",des_id=1)
        db.session.add(test_employee)
        db.session.commit()        
        response = self.client.put('/update_employee/1',json={"employee_name":'John Honai',"address":"tvm","phone_number":"554744","email":"john@gamil.com","leave_taken":0,"des_name":"HR" })        
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertEqual(data['message'],'Designation "HR" not found')

    def test_update_employee_success(self):        
        test_employee= Employee(employee_name='john',address="tvm",phone_number="554744",email="john@gamil.com",des_id=1)
        db.session.add(test_employee)
        db.session.commit()        
        response = self.client.put('/update_employee/111',json={"employee_name":'John Honaiii',"address":"tvm","phone_number":"554744","email":"john@gamil.com","leave_taken":0,"des_name":"Manager" })        
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertEqual(data['message'],'Employee not found') 

    def test_update_employee_no_data(self):        
        test_employee= Employee(employee_name='john',address="tvm",phone_number="554744",email="john@gamil.com",des_id=1)
        db.session.add(test_employee)
        db.session.commit()        
        response = self.client.put('/update_employee/1',json={})        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertEqual(data['message'],'No data provided in request')  
  






    





if __name__ == '__main__':
    unittest.main()