const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const confirm = require('inquirer-confirm');
require('dotenv').config();
const db = mysql.createConnection (
    {
        host:'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PW
    },
    console.log('Successfully Connected!')
);


function askQuestions() {
    inquirer.prompt([{
        type:'list',
        name:'option',
        choices: [{
            name: 'View all departments',
            value: 'viewDepartments'
        }, {
            name: 'View all roles',
            value: 'viewRoles',
        }, {
            name: 'View all employees',
            value: 'viewEmployees'
        }, {
            name: 'Add a new departments',
            value: 'addDepartment'
        }, {
            name: 'Add a new role',
            value: 'addRole'
        }, {
            name: 'Add a new employee',
            value: 'addEmployee'
        }, {
            name: 'Update an existing employee',
            value: 'updateEmployee'
        },
        ]
    }])
        .then (answer => {
            console.log('Looking for an answer!');
            switch (answer.option) {
                case 'viewDepartments':
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                        confirmCount();
                    });  
                    
                break;
            // ROLES
                case 'viewRoles':
                    db.query('SELECT * FROM roles', function (err, results) {
                        console.table(results);
                        confirmCount();
                    });
                break;
                
                case 'viewEmployees':
                    db.query('SELECT * FROM employee', function (err, results) {
                        console.table(results);
                        confirmCount();
                    });
                break;

                case 'addDepartment':
                    inquirer.prompt ({
                        type: 'input',
                        message: 'What is the name of the department to add?',
                        name: 'newDept'
                    })
                    .then((answers) => {
                        newDept = answers.newDept
                        db.query(`INSERT INTO department (name) VALUES ("{newDept}");`, function (err,results) {
                        console.log(newDept + 'has been added');
                        if (err) throw err;
                        console.log('1 record inserted')
                        confirmCount();
                    });
                })
                break;

                case 'addRole':
                    inquirer.prompt([
                        {
                            type:'input',
                            message: 'What is the name of the role to add?',
                            name: 'newRole',
                        },
                        {
                            type:'input',
                            message:'What is the salary for the role to add?',
                            message:'newSalary',
                        },
                        {
                            type:'input',
                            message:'What is the department id for the role to add?',
                            name:'newDeptId',
                        },
                    ])
                    .then((answers) => {
                        newRole = answers.newRole
                        newSalary = answers.newSalary
                        newDeptId = answers.newDeptId
                        db.query(`INSERT INTO roles (title, salary, department_id)
                        VALUES ("${newRole}", "${newSalary}", ${newDeptId};`, function (err, results) {
                            console.log(newRole + "has been added to the role table");
                            if (err) throw err;
                            console.log("1 record inserted")
                            confirmCount();
                        });
                    })
                    break;

                    case "addEmployee":
                        inquirer.prompt([
                            {
                                type: 'input',
                                message: 'What is the first name of the employee to add?',
                                name:'newFName',
                            },
                            {
                                type: 'input',
                                message:'What is the last name of the employee to add?',
                                name: 'newLName',
                            },
                            {
                                type:'input',
                                message:'What is the role id for the employee to add?',
                                name:'newRoleId',
                            },
                            {
                                type:'input',
                                message:'What is the manager id of the employee to add?',
                                name:'newMGRId'
                            },
                        ])
                        .then((answers) => {
                            newFName = answers.newFName
                            newLName = answers.newLName
                            newRoleId = answers.newRoleId
                            newMgrId = answers.newMGRId
                            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES ("${newFName}"), "${newLName}", ${newRoleId}, ${newMGRId});`,
                            function (err, results) {
                                console.log(newFName + " " + newLName + " has been added to the table");
                                if(err) throw err;
                                console.log("1 record inserted")
                                confirmCount();
                            });
                        })
                    break;
                    
                    case 'updateEmployee':
                        inquirer.prompt ([
                            {
                                type: 'input',
                                message: 'Enter the id of an employee to update:',
                                name: 'targetEmpId',
                            },
                            {
                                type: 'input',
                                message: 'What is the new role id for this employee',
                                name: 'newRoleId',
                            },
                        ])
                        .then((answers) => {
                            targetEmpId = answers.targetEmpId
                            newRoleId = answers.newRoleId
                            db.query(`UPDATE employee 
                            SET role_id = ${newRoleId}
                            WHERE id =  ${targetEmpId};`,
                            function (err, results) {
                                console.log('Employee id' + targetEmpId + 'has been updated with a new role' + newRoleId);
                                if (err) throw err;
                                console.log('1 record inserted')
                                confirmCount();
                            });
                        })
                        break;
                    default: console.log('No valid option chosen');
                }
        });
};
function confirmCount() {
    confirm('Would you like to continue?')
    .then(function confirmed() {
        askQuestions();
    }, function cancelled() {
        console.log('Goodbye!');
    });
};

askQuestions();

