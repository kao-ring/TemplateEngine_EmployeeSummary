const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeesArray = [];
let employee = "";

//Questions
const startQuestion = [
  {
    type: "list",
    message: "Which type of member would you like to add?",
    name: "role",
    choices: [
      "Manager",
      "Engineer",
      "Intern",
      "I don't want to add any more team members.",
    ],
  },
];

const mQuestions = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your manager's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your manager's e-mail?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "officeNumber",
  },
];

const eQuestions = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your engineer's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your engineer's e-mail?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your engineer's github user name?",
    name: "github",
  },
];

const iQuestions = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your intern's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your intern's e-mail?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "school",
  },
];
//Promt start===============================
function questions() {
  inquirer.prompt(startQuestion).then(function ({ role }) {
    switch (role) {
      case "Manager":
        inquirer
          .prompt(mQuestions)
          .then(function ({ name, id, email, officeNumber }) {
            employee = new Manager(name, id, email, officeNumber);
            employeesArray.push(employee);
            //Because the team has only one manager, delete manager from choice after input
            startQuestion[0].choices = [
              "Engineer",
              "Intern",
              "I don't want to add any more team members.",
            ];
            questions();
          });
        break;

      case "Engineer":
        inquirer
          .prompt(eQuestions)
          .then(function ({ name, id, email, github }) {
            employee = new Engineer(name, id, email, github);
            employeesArray.push(employee);
            questions();
          });
        break;

      case "Intern":
        inquirer
          .prompt(iQuestions)
          .then(function ({ name, id, email, school }) {
            employee = new Intern(name, id, email, school);
            employeesArray.push(employee);
            questions();
          });
        break;

      default:
        outPut();
    }
  });
}

function outPut() {
  const employeeData = render(employeesArray);
  fs.writeFile(outputPath, employeeData, function (err) {
    if (err) {
      //if writeFile couldn't find a destination, make a directry here
      fs.mkdir(OUTPUT_DIR, function (err) {
        if (err) {
          throw new Error("mkdir failed");
        } else {
          console.log("successfully created directory.");
          fs.writeFile(outputPath, employeeData, function (err) {
            if (err) {
              throw new Error("write to html failed");
            }
          });
        }
      });
    }
    console.log("Succesefully created team cards!");
  });
}

function init() {
  console.log("***Please build your team***");
  questions();
}

init();
