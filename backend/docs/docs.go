// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/news": {
            "get": {
                "description": "Get a list of all news",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "news"
                ],
                "summary": "Get all news",
                "responses": {}
            },
            "post": {
                "description": "Create a new news item",
                "consumes": [
                    "multipart/form-data"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "news"
                ],
                "summary": "Create news",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Title of the news",
                        "name": "title",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Description of the news",
                        "name": "description",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "file",
                        "description": "Photo of the news",
                        "name": "photo",
                        "in": "formData",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/news/{id}": {
            "get": {
                "description": "Get a news item by its ID",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "news"
                ],
                "summary": "Get news by ID",
                "parameters": [
                    {
                        "type": "string",
                        "description": "News ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {}
            },
            "put": {
                "description": "Update a news item by its ID",
                "consumes": [
                    "multipart/form-data"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "news"
                ],
                "summary": "Update news by ID",
                "parameters": [
                    {
                        "type": "string",
                        "description": "News ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Title of the news",
                        "name": "title",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "description": "Description of the news",
                        "name": "description",
                        "in": "formData"
                    },
                    {
                        "type": "file",
                        "description": "Photo of the news",
                        "name": "photo",
                        "in": "formData"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            },
            "delete": {
                "description": "Delete a news item by its ID",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "news"
                ],
                "summary": "Delete news",
                "parameters": [
                    {
                        "type": "string",
                        "description": "ID новости",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8080",
	BasePath:         "/api/v1/",
	Schemes:          []string{},
	Title:            "From heart to heart API",
	Description:      "This is a sample swagger for Fiber",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
