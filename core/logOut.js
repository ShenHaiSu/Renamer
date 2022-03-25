module.exports = {
  errorOut, logOut, infoOut
}

function errorOut(input) {
  console.error(`【ERROR】 - `, input);
}

function logOut(input) {
  console.log(`【 LOG 】 - `, input);
}

function infoOut(input) {

  console.info(`【 INFO】 - `, input);
}