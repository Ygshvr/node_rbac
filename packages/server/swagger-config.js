module.exports = {
  "openapi": "3.0.1",
  "info": {
    "title": "Swagger API Playground",
    "description": "Simple API server to demonstrate RBAC in nodejs.",
    "license": {
      "name": "MIT",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:4000/"
    }
  ],
  "tags": [
    {
      "name": "auth",
      "description": "Authentication routes"
    },
    {
      "name": "user",
      "description": "Operations about user"
    }
  ],
  "paths": {
    "/api/auth/login": {
      "post": {
        "tags": [
          "auth"
        ],
        "summary": "Logs user into the system",
        // "parameters": [
        //   {
        //     "name": "username",
        //     "in": "query",
        //     "description": "The user name for login",
        //     "required": true,
        //     "schema": {
        //       "type": "string"
        //     }
        //   },
        //   {
        //     "name": "password",
        //     "in": "query",
        //     "description": "The password for login in",
        //     "required": true,
        //     "schema": {
        //       "type": "string"
        //     }
        //   }
        // ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/definitions/UserLogin"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/definitions/Token"
                }
              }
            }
          },
          "401": {
            "description": "Invalid username/password supplied",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/definitions/Error"
                }
              }
            }
          }
        }
      }
    },
    "/api/user/{userId}": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Get user by user id",
        "security": [
          {
            "bearerAuth": [

            ]
          }
        ],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "description": "UserId of the user that need to be fetched.",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/definitions/User"
                }
              }
            }
          },
          "404": {
            "description": "User not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/definitions/Error"
                }
              }
            }
          }
        }
      }
    },
    "/api/user/getAll": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "get All user.",
        "security": [
          {
            "bearerAuth": [

            ]
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/definitions/User"
                }
              }
            }
          },
          "401": {
            "description": "You are not authorized to access all users.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/definitions/Error"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "definitions": {
    "UserLogin": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      },
      "required": [
        "email",
        "password"
      ]
    },
    "User": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "role": {
          "type": "string"
        }
      }
    },
    "Token": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string"
        }
      }
    },
    "Error": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      }
    }
  }
}