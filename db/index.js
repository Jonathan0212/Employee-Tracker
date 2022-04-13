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
                    inqurier.prompt ({
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
                
}