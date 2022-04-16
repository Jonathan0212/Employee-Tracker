INSERT INTO department (id, name)
VALUES 
    (1, 'Senior Software Engineer'),
    (2, 'Software Develop Engineer'),    
    (3, 'Intern Software Engineer'),
    (4, 'Full Stack Software Engineer');

INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (1, 'Marshall Trooper', 79999.99, 1),
    (2, '501st Legion Troopers', 99999.99, 2),
    (3, 'ARC Troopers', 109999.99, 1),
    (4, 'The Bad Batch', 9999999.99, 2),
    (5, '187th Legion Troopers', 88888.99, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Captain', 'Rex', 3, 1),
    ('Fives', 'Trooper', 2, NULL),
    ('Hunter', 'Trooper', 4, 1),
    ('Echo', 'Trooper', 3, NULL),
    ('Wrecker', 'Trooper', 4, NULL),
    ('Commander', 'Cody', 1, 1),
    ('Hevy', 'Trooper', 2, NULL);
