module.exports = {
  gerneEnvConfig(envName) {
    return [
      {
        commandName: envName,
        scripts: [
          {
            command: "serve",
            options: {
              service: envName
            }
          }
        ]
      },
      {
        commandName: `build:${envName}`,
        scripts: [
          {
            command: "build",
            options: {
              service: envName
            }
          }
        ]
      }
    ];
  },
  defaultScriptAlias: {
    development: [
      {
        commandName: "dev",
        scripts: [
          {
            command: "serve",
            options: {}
          }
        ]
      },
      {
        commandName: "build:dev",
        scripts: [
          {
            command: "build",
            options: {
              service: "development"
            }
          }
        ]
      }
    ],
    production: [
      {
        commandName: "build",
        scripts: [
          {
            command: "build",
            options: {}
          }
        ]
      }
    ],
    test: [
      {
        commandName: "test",
        scripts: [
          {
            command: "serve",
            options: {
              service: "test"
            }
          }
        ]
      },
      {
        commandName: "build:test",
        scripts: [
          {
            command: "build",
            options: {
              service: "test"
            }
          }
        ]
      }
    ],
    vf: [
      {
        commandName: "vf",
        scripts: [
          {
            command: "serve",
            options: {
              service: "vf"
            }
          }
        ]
      },
      {
        commandName: "build:vf",
        scripts: [
          {
            command: "build",
            options: {
              service: "vf"
            }
          }
        ]
      }
    ]
  }
};
