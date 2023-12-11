function saveFormData(formName) {
  const form = document.getElementById(formName);
  const formData = new FormData(form);
  const formDataObj = {};

  formData.forEach((value, key) => {
    // Check if the key already exists in the object
    if (Object.prototype.hasOwnProperty.call(formDataObj, key)) {
      // If the key already exists, make the value an array and add the new value
      if (!Array.isArray(formDataObj[key])) {
        formDataObj[key] = [formDataObj[key]];
      }
      formDataObj[key].push(value);
    } else {
      // If the key doesn't exist, add the key-value pair to the object
      formDataObj[key] = value;
    }
  });

  // Convert the form data object to JSON
  const jsonData = JSON.stringify(formDataObj);
  const localStorageKey = '/tmp/${formName}_data.json`;

  // Save the JSON data to localStorage
  localStorage.setItem(localStorageKey, jsonData);

  // Output the JSON data (you can do something else with it, like send it to a server)
  console.log(jsonData);
}

submitForms = function(){
    saveFormData("web_form");
    saveFormData("db_form");
    saveFormData("client_form");
    //document.getElementById("web_form").submit();
    //document.getElementById("db_form").submit();
    //document.getElementById("client_form").submit();
}