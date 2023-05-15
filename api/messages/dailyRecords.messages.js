module.exports = {
  success: {
    s0: {
      code: "DayRecordCreated",
      http: 201,
      type: "success",
    },
    s1: {
      http: 200,
      code: "DayRecordUpdated",
      type: "success",
    },
    s2: {
      http: 200,
      code: "DayRecordFound",
      type: "success",
    },
    s3: {
      http: 200,
      code: "DayRecordDeleted",
      type: "success",
    },
    s4: {
      http: 200,
      code: "Deactivated",
      type: "success",
    },
    s5: {
      http: 204,
      code: "NoDayRecords",
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
      code: "DayRecordNotFound",
      type: "error",
    },
  },
};
