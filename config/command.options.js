module.exports = {
  gerneEnvConfig(envName) {
    return [
      {
        commandName: [envName],
        scripts: [
          {
            command: "serve",
            options: {
              mode: [envName]
            }
          }
        ]
      },
      {
        commandName: `build:${[envName]}`,
        scripts: [
          {
            command: "check::env",
            options: {
              service: [envName]
            }
          },
          {
            command: "build",
            options: {}
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
            command: "check::env",
            options: {
              service: "development"
            }
          },
          {
            command: "build",
            options: {}
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
              mode: "test"
            }
          }
        ]
      },
      {
        commandName: "build:test",
        scripts: [
          {
            command: "check::env",
            options: {
              service: "test"
            }
          },
          {
            command: "build",
            options: {}
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
              mode: "vf"
            }
          }
        ]
      },
      {
        commandName: "build:vf",
        scripts: [
          {
            command: "check::env",
            options: {
              service: "vf"
            }
          },
          {
            command: "build",
            options: {}
          }
        ]
      }
    ]
  }
};
