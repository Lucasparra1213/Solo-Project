import { Schema, model } from "mongoose";

const patientsSchema = new Schema ({

    age:{
        type: Number,
        required: [true, 'A patient age is required'],
        min: [1, 'Age must be at least 1 year old'],
        max: [140, 'Age can not exceed 140 years old']
    },
    name:{
        type: String,
        required: [true, 'A patient name is required'],
        minLength: [1, 'Patient name must be at least 1 characters'],
        maxLength:[40, 'Patient must not exceed 40 characters']
    },

    observations: {
        type: String,
        required: [true, 'A patient observation is required'],
        minLength: [1, 'Observation must be at least 1 character'],
        maxLength:[200, 'Observation must not exceed 200 characters']
    },
    

    appointments:{
        type: Date,
        required:[true, 'A date of visit is required'],
        validate: {
            validator: function(value) {
                
                return value >= new Date();
            },
            message: 'Next visit must be a future date'
        }
    },


},
    {timestamps :true},
);

const Patients = model('Patients', patientsSchema);
export default Patients;