import { configureStore } from "@reduxjs/toolkit";
import loginDataReducer from "./login"
import employeeDataReducer from "./employeelist";
// import postEmployeeDataReducer from "./employeeAdd";
import employeeByIdReducer from "./employeeById";
import updateDataReduer from "./updateEmployee";
import designationDataReducer from "./listDesignation";
import postDesignationReducer  from "./addDesignation";
import updateDesignationDataReducer from "./updateDesignation";




export const store = configureStore({
    reducer:
    {
     loginData:loginDataReducer,
     employeeData:employeeDataReducer,
    //  postEmployee:postEmployeeDataReducer,
     employeeById:employeeByIdReducer,
     updateEmployee:updateDataReduer,
     designationData:designationDataReducer,
     postDesignation:postDesignationReducer,
     updateDesignation:updateDesignationDataReducer
    },
});
