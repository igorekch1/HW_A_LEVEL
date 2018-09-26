var group = [
    student1 = {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        age:'28',
        gender:'Male',
        englSkill:'Intermediate'
    },
    student2 = {
        firstName: 'Petr',
        lastName: 'Petrov',
        age:'31',
        gender:'Male',
        englSkill:'Upper-Intermediate'
    },
    student3 = {
        firstName: 'Anna',
        lastName: 'Semenova',
        age:'21',
        gender:'Female',
        englSkill:'Advanced'
    },
    student4 = {
        firstName: 'Sergej',
        lastName: 'White',
        age:'43',
        gender:'Male',
        englSkill:'Elementary'
    },
    student5 = {
        firstName: 'Jessica',
        lastName: 'Smith',
        age:'25',
        gender:'Female',
        englSkill:'Intermediate'
    }]

//Просмотреть студентов
function getStudentsList ( arrayOfStudents ) {
    console.log("Список студентов:");
    for (students in arrayOfStudents){
        console.log(arrayOfStudents[students].firstName+" "+arrayOfStudents[students].lastName+" "+arrayOfStudents[students].age+" "+arrayOfStudents[students].gender+" "+arrayOfStudents[students].englSkill);
    }
}

getStudentsList(group);

console.log("------------------------------------");

// Добавить студента
function addNewStudent(name,surname,_age,_gender,_englSkill, arrayOfStudents){
        arrayOfStudents.push({
            firstName: name,
            lastName: surname,
            age: _age,
            gender: _gender,
            englSkill: _englSkill
        });
        console.log("Студент добавлен!");
}

addNewStudent("Igor","Cherniaiev",18,"Male","Advanced", group);

getStudentsList(group);

