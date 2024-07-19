import flask
from models import *
from sqlalchemy import select,null
from flask import request,session
from flask import jsonify
from flask_cors import CORS,cross_origin
import datetime as dt

app = flask.Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:1234@localhost:5432/hrms"
app.config['SECRET_KEY'] = 'sona'
CORS(app)
db.init_app(app)

# now=dt.datetime.now(dt.timezone.utc).isoformat()

@app.route("/")
def home():
    return "Hello, world"


@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.json
    username = data['username']
    password = data['password']
    
     # Check if username already exists
    existing_user = HR.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists. Please choose a different username.'}), 400

    # Create new user
    new_user = HR(username=username)
    new_user.set_password(password)
   

    # Add new user to database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully.'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    
    user = HR.query.filter_by(username=username).first()

    if user and user.check_password(password):
        
        session['user_id'] = user.user_id
        session['username'] = user.username
        return jsonify({'message': 'Login successful.'}), 200
    else:
        return jsonify({'message': 'Incorrect username or password. Please try again.'}), 401

@app.route('/dashboard', methods=['GET'])
def dashboard():
  
    if 'user_id' in session:
        
        return jsonify({'message': f'Welcome {session["username"]}! This is your dashboard.'}), 200
    else:
        return jsonify({'message': 'Unauthorized access. Please log in first.'}), 401

@app.route('/logout', methods=['POST'])
def logout():
   
    session.clear()
    return jsonify({'message': 'Logged out successfully.'}), 200


@app.route('/designation', methods=['POST'])
def add_designation():
    if request.method == 'POST':
       
        designation_name = request.json.get('designation_name')
        maximum_leave = request.json.get('maximum_leave', 0)
        new_designation = Designation(designation_name=designation_name, maximum_leave=maximum_leave)
        db.session.add(new_designation)
        db.session.commit()

        return jsonify({'message': 'Designation added successfully!'})



@app.route('/designations',methods=['GET'])
def list_designations():
    designation_list=Designation.query.filter(Designation.deleted_at==None)
    result=[]
    for item in designation_list:
        details = {"designation_id":item.designation_id,
                    "designation_name":item.designation_name,
                    "maximum_leave":item.maximum_leave
                    }
        result.append(details)
    return flask.jsonify(result)


@app.route('/designation/<int:designation_id>', methods=['GET'])
def get_designation_by_id(designation_id):
    designation = Designation.query.get(designation_id)
    if designation is None:
        return jsonify({"error": "Not found"}), 404

    details = {
        "designation_id": designation.designation_id,
        "designation_name": designation.designation_name,
        "maximum_leave": designation.maximum_leave
    }
    return jsonify(details)


@app.route('/update_designation/<int:designation_id>', methods=['PUT'])
def update_designation(designation_id):
    designation = Designation.query.get(designation_id)
    if designation:
        if 'designation_name' in request.json:
            designation.designation_name = request.json['designation_name']
        
        if 'maximum_leave' in request.json:
            designation.maximum_leave = request.json['maximum_leave']

        db.session.commit()
        return jsonify({'message': 'Designation updated successfully'})
    else:
        return jsonify({'message': 'Designation not found'}), 404



@app.route('/delete_designation/<int:designation_id>', methods=['POST'])
def delete_designation(designation_id):
    designation=Designation.query.get(designation_id)
    now=dt.datetime.now(dt.timezone.utc).isoformat()
    designation.deleted_at=now
    db.session.commit()
    return jsonify({'message':'Designation deleted successfully'})


@app.route('/employee', methods=['POST'])
def add_employee():
    if request.method == 'POST':
        employee_name = request.json.get('employee_name')
        address = request.json.get('address')
        phone_number = request.json.get('phone_number')
        email = request.json.get('email')
        leave_taken = request.json.get('leave_taken', 0)
        des_name = request.json.get('des_name')

        # Check if the designation exists
        designation = Designation.query.filter_by(designation_name=des_name).first()
        if not designation:
            return jsonify({'message': 'Designation not found'}), 404

        new_employee = Employee(employee_name=employee_name,
                               address=address,
                               phone_number=phone_number,
                               email=email,
                               leave_taken=leave_taken,
                               des_id=designation.designation_id)

        db.session.add(new_employee)
        db.session.commit()

        return jsonify({'message': 'Employee added successfully'})

@app.route('/employees',methods=['GET'])
def list_employee():
    employee_list=Employee.query.filter(Employee.deleted_at==None)
    result=[]
    for item in employee_list:
        details = {"employee_id":item.employee_id,
                    "employee_name":item.employee_name,
                    "address":item.address,
                    "phone_number":item.phone_number,
                    "email":item.email,
                    "leave_taken":item.leave_taken,
                    "des_id":item.des_id,
                    "des_name":item.designation.designation_name,
                    "maximum_leave":item.designation.maximum_leave
                    }
        result.append(details)
    return flask.jsonify(result)


@app.route('/update_employee/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if employee:
       
        if 'employee_name' in request.json:
            employee.employee_name = request.json['employee_name']
        
        
        if 'address' in request.json:
            employee.address = request.json['address']

       
        if 'phone_number' in request.json:
            employee.phone_number = request.json['phone_number']

        
        if 'email' in request.json:
            employee.email = request.json['email']

        
        if 'leave_taken' in request.json:
            
            designation = employee.designation
            if designation:
                max_leave = designation.maximum_leave
                new_leave_taken = request.json['leave_taken']

                # Ensure leave_taken does not exceed maximum_leave
                if int(new_leave_taken) > max_leave:
                    new_leave_taken = max_leave

                employee.leave_taken = new_leave_taken

        
        if 'des_name' in request.json:
            des_name = request.json['des_name']
            designation=Designation.query.filter_by(designation_name=des_name).first()
            
            employee.des_id=designation.designation_id
            
        

        db.session.commit()
        return jsonify({'message': 'Employee updated successfully'})
    else:
        return jsonify({'message': 'Employee not found'}), 404



# @app.route('/delete_employee/<int:employee_id>', methods=['DELETE'])
# def delete_employee(employee_id):
#     employee = Employee.query.get(employee_id)
#     if employee:
#         db.session.delete(employee)
#         db.session.commit()
#         return jsonify({'message': 'Employee deleted successfully'})
#     else:
#         return jsonify({'message': 'Employee not found'}), 404


@app.route('/delete_employee/<int:employee_id>', methods=['POST'])
def delete_employee(employee_id):
    employee=Employee.query.get(employee_id)
    now=dt.datetime.now(dt.timezone.utc).isoformat()
    employee.deleted_at=now
    db.session.commit()
    return jsonify({'message':'Employee deleted successfully'})

    




@app.route('/employee/<int:employee_id>',methods=['GET'])
def employee_by_id(employee_id):
    item=Employee.query.filter_by(employee_id=employee_id).first()
    if not item:
        return flask.jsonify({"error": "Employee not found"}), 404
    # print(item)
    details = {"employee_id":item.employee_id,
                    "employee_name":item.employee_name,
                    "address":item.address,
                    "phone_number":item.phone_number,
                    "email":item.email,
                    "leave_taken":item.leave_taken,
                    "des_id":item.des_id,
                    "des_name":item.designation.designation_name,
                    "maximum_leave":item.designation.maximum_leave
                    }

    return flask.jsonify(details)




with app.app_context():
    db.create_all()

if __name__ == "__main__":
  init_db()
  app.run(port=5000)