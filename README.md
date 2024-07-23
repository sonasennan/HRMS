# HRMS
- Login Credentials:

     username  : sonasennan

     password  : 1234 

- To register a new user , the endpoint is   :  http://127.0.0.1:5000/register   ( use Postman / Thunder Client )

    For example : {'username' : 'something'   ,  'password' : 'something'}

- Attached requirement.txt with all the installations.   ( pip install -r requirement.txt )

- Flask running on : http://127.0.0.1:5000

- `. ./venv/bin/activate`  

- To run flask :      flask --app app run --debug

- To run react :   npm install , then ,npm run dev


## Unittest
- Create a new database for testing purpose.
- Ensure the name of database is changed in the app.py before testing to avoid losing the data.
- To run the test :  python3 test_file.py
- In flask folder , use the commands given below to get the coverage :
  
  `pip install coverage`

  `python3 -m coverage run -m unittest test_file.py`

  `python3 -m coverage report` 

  `python3 -m coverage html`

