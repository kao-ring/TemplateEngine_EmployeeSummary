const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
const startQuestion = [
  {
    type: "list",
    message: "Which type of member would you like to add?",
    name: "type",
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
    name: "mName",
  },
  {
    type: "input",
    message: "What is your manager's ID?",
    name: "mID",
  },
  {
    type: "input",
    message: "What is your manager's e-mail?",
    name: "mEmail",
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "mPhone",
  },
];

const eQuestions = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "eName",
  },
  {
    type: "input",
    message: "What is your engineer's ID?",
    name: "eID",
  },
  {
    type: "input",
    message: "What is your engineer's e-mail?",
    name: "eEmail",
  },
  {
    type: "input",
    message: "What is your engineer's github user name?",
    name: "eGithub",
  },
];

const iQuestions = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "iName",
  },
  {
    type: "input",
    message: "What is your intern's ID?",
    name: "iID",
  },
  {
    type: "input",
    message: "What is your intern's e-mail?",
    name: "iEmail",
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "iSchool",
  },
];

async function questions() {
  let input = await inquirer.prompt(startQuestion);
  while (input !== "I don't want to add any more team members.") {
    switch (input) {
      case "Manager":
        console.log("ジャーマネ");
        inquirer.prompt(mQuestions);
        break;

      case "Engineer":
        inquirer.prompt(eQuestions);
        break;

      case "Intern":
        inquirer.prompt(iQuestions);
        break;
      default:
    }
  }
}

function init() {
  console.log("Please build your team");
  questions();
}

init();
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
