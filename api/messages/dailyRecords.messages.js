module.exports = {
  success: {
    s0: {
      code: "DailyRecordCreated",
      http: 201,
      type: "success",
    },
    s1: {
      http: 200,
      code: "DailyRecordUpdated",
      type: "success",
    },
    s2: {
      http: 200,
      code: "DailyRecordFound",
      type: "success",
    },
    s3: {
      http: 200,
      code: "DailyRecordDeleted",
      type: "success",
    },
    s4: {
      http: 200,
      code: "Deactivated",
      type: "success",
    },
    s5: {
      http: 204,
      code: "NoDailyRecords",
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
      code: "DailyRecordNotFound",
      type: "error",
    },
  },
};
