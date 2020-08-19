# Project Tracker UI
The client side for a project tracker application.

## About
The project tracker is used to keep track of projects and all the goals that make them up. It will use progress bars to capture completeness with each goal being able to be made of smaller goals. Will be mobile first design.

### Built with:
- React JS
- Lambda
- API Gateway
- DynamoDB
- Material UI for design

### Learning Goals
**Better organization**
- Each component will be in its own folder that contains
its seperate stylesheet and images
- Use absolute imports
    - create jsconfig
- AWS technologies
    - DyanmoDB for database management
    - API Gateway to interact with Lambda functions
    - Lambda to handle CRUD
    - IAM
    - Cognito

## Data Schema
```
 {
    "id": "stringID",
    "projects": [
        {
            "projName": "string",
            "projDesc": "string",
            "goals": [
                {
                    "goalCompleted": "boolean",
                    "goalName": "string",
                    "goalDesc": "string",
                    "subGoals": [
                        {
                            "checked": "boolean",
                            "subGoal": "string"
                        }
                    ]
                }
            ]
        }
    ]
}
```

## To-Do
- Update project button? 
    - instead of making several network calls for each box checked/unchecked, make changes local and 
    ask user if they want to update changes made before leaving app/page
    - include update button
        - only appears when changes made