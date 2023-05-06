module.exports = {
  success: {
    s0: {
      code: "PatientCreated",
      http: 201,
      type: "success",
    },
    s1: {
      http: 200,
      code: "PatientUpdated",
      type: "success",
    },
    s2: {
      http: 200,
      code: "PatientFound",
      type: "success",
    },
    s3: {
      http: 200,
      code: "PatientDeleted",
      type: "success",
    },
    s4: {
      http: 200,
      code: "Deactivated",
      type: "success",
    },
    s5: {
      http: 204,
      code: "NoPatients",
      type: "success",
    },
    s6: {
      http: 200,
      code: "Activated",
      type: "success",
    },
  },
  error: {
    e0: {
      http: 404,
      code: "PatientNotFound",
      type: "error",
    },
  },
};
