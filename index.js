// Extrnal dependencies
const fs = require('fs');
const inquirer = require('inquirer');

// Array of inquire-question objects for user input prompts
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Welcome to the README generator app! Please eneter your full name:',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Full name required !');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('GitHyb user name required !');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: emailInput => {
            if (ValidateEmail(emailInput)) {           
                return true;
            } else {
                console.log('\nYour email address is required to be able to answer any questions about your project !');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Project title is required! ');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'description',
        message: "Enter your project description here:",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Project description is required.');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'installation',
        message: 'What are the instructions for installation?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please provide installation instructions !');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'usage',
        message: 'Instructions for usage:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Providing instructions for usage !');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicenses',
        message: 'Would you like to include a license?',
        default: false
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'Select a license from the following List to include -- use UP and DOWN arrow keys to select?',
        choices: ['Apache', 'Eclipse', 'Boost', 'BSD', 'MIT', 'GNU', 'ISC', 'Mozilla'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'contributing',
        message: 'How can other users contribute to this project?',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please provide instructions on how other users can contribute to your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Describe the tests written for your application and how to use them (if any), NILL otherwise:',
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please provide instructions on how others can contribute to your project.');
                return false;
            }
        }
    },

];

//Use regular expression syntax to validate email input
//code snippet from https://www.w3resource.com/javascript/form/email-validation.php
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        debugger;
        return (true)
    }
    else {
        debugger;
        return (false)
    }
}


// Initialize app
const init = () => {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
    //Generate Markdown texts from user responses
    .then(userInput => {
        return createMarkdown(userInput);
    })
    //Create a README File and pass the markdown text
    .then(readmeInfo => {
        return writeToFile(readmeInfo);
    })
    .catch(err => {
        console.log(err);
    })


//Generate markdound functions  ======================================================================


// Returns a license badge based on which license is selected
function getLicenseBadge(license) {
    if (!license) {
        return ``;
    } else {
        switch (true) {
            case license.includes("Appache"):
                return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
            case license.includes("Eclipse"):
                return `[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`;
            case license.includes("Boost"):
                return `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
            case license.includes("BSD"):
                return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
            case license.includes("MIT"):
                return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
            case license.includes("GNU"):
                return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
            case license.includes("ISC"):
                return `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
            case license.includes("Mozilla"):
                return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
            default:
                return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
        }
    }
}

// Returns the license section of README. If there is no license, return an empty string
function setLicenseSection(license) {
    if (!license) {
        return ``;
    } else {
        return `## Licenses
    This project is covered under the ${license} license. To learn more about what this means, click the license button at the top.`
    }
}

// Generate markdown for README
function createMarkdown(data) {
    return `# ${data.title}

  ${getLicenseBadge(data.licenses)}

  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Licenses](#licenses)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  * [Credits](#credits)

  ## Description
  ${data.description}

  ## Installation
  ${data.installation}

  ## Usage
  ${data.usage}

  ${setLicenseSection(data.licenses)}

  ## Contributing
  ${data.contributing}

  ## Tests
  ${data.tests}

  ## Questions
  Have questions about this project?  
  GitHub: https://github.com/${data.github}  
  Email: ${data.email}

  ## Credits
  ${data.name}
`;
}


// Function to write markdown to the README_out.md file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./README_out.md', data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: console.log('\n\nThe README_OUT.md file was generated successfully!')
            });
        })
    })
}





