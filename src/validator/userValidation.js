import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);
ajvErrors(ajv); // enable custom messages

const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      errorMessage: {
        type: "Name must be a string.",
        minLength: "Name must have at least 2 characters.",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        type: "Email must be a string.",
        format: "Please enter a valid email address.",
      },
    },
    age: {
      type: "integer",
      minimum: 1,
      errorMessage: {
        type: "Age must be a number.",
        minimum: "Age must be at least 1.",
      },
    },
  },
  required: ["name", "email"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "Name is required.",
      email: "Email is required.",
    },
    additionalProperties: "Extra fields are not allowed.",
  },
};

export const validateUser = ajv.compile(userSchema);
