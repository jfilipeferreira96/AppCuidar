module.exports = {
    success: {
        s0: {
            code: "DayRegistryCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "DayRegistryUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "DayRegistryFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "DayRegistryDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoDayRegistrys",
            type: "success"
        },
        s6: {
            http: 200,
            code: "Activated",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "DayRegistryNotFound",
            type: "error"
        }
    }
}