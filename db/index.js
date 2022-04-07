function askQuestions() {
    inqurier.prompt([{
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
}