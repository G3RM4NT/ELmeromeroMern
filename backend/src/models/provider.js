import { Schema, model } from "mongoose";

const providerSchema = new Schema (

{



    Name: {

type: String

    },

    telephone: {

        type: String
        
            },

            image: {

                type: String
                
                    },


}, {

    timestamps: true,
    strict: false
}    
)

export default model ("providers", providerSchema)