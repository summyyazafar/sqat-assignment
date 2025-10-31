function validation (name,user,pass,confirmpass,mobileNumber,emails) {

    if (name == "") {
      document.getElementById("Name").innerHTML =
        " ** Please fill the Name field";
      return false;
    }

    if (emails == "") {
      document.getElementById("emailids").innerHTML =
        " ** Please fill the email id field";
      return false;
    }
    if (emails.indexOf("@") <= 0) {
      document.getElementById("emailids").innerHTML = " ** Invalid Email";
      return false;
    }

    if (
      emails.charAt(emails.length - 4) != "." &&
      emails.charAt(emails.length - 3) != "."
    ) {
      document.getElementById("emailids").innerHTML = " ** Invalid Email";
      return false;
    }

    if (user == "") {
      document.getElementById("username").innerHTML =
        " ** Please fill the username field";
      return false;
    }
    if (user.length <= 3 || user.length > 20) {
      document.getElementById("username").innerHTML =
        " ** Username lenght must be between 3 and 20";
      return false;
    }
    if (!isNaN(user)) {
      document.getElementById("username").innerHTML =
        " ** only characters are allowed";
      return false;
    }

    if (pass == "") {
      document.getElementById("passwords").innerHTML =
        " ** Please fill the password field";
      return false;
    }
    if (pass.length <= 5 || pass.length > 20) {
      document.getElementById("passwords").innerHTML =
        " ** Passwords lenght must be between  5 and 20";
      return false;
    }

    if (pass != confirmpass) {
      document.getElementById("confrmpass").innerHTML =
        " ** Password Mismatch";
      return false;
    }

    if (confirmpass == "") {
      document.getElementById("confrmpass").innerHTML =
        " ** Please fill the confirmpassword field";
      return false;
    }

    if (mobileNumber == "") {
      document.getElementById("mobileno").innerHTML =
        " ** Please fill the mobile NUmber field";
      return false;
    }
    if (isNaN(mobileNumber)) {
      document.getElementById("mobileno").innerHTML =
        " ** user must write digits only not characters";
      return false;
    }
    if (mobileNumber.length != 11) {
      document.getElementById("mobileno").innerHTML =
        " ** Mobile Number must be 11 digits only";
      return false;
    }
    return true;
}


test('Validation should be sucessful', () => {

  expect(
    validation("John","John123","test123","test123","61451406672","abc@gmail.com")
  ).toBeTruthy();
});


test("Validation should be successful with special character", () => {

  expect(
    validation("asdasd","asdf","test@123","test@123","61451062442","abc@gmail.com")
  ).toBeTruthy();
});

test('Name with only whitespace should be treated as valid (equivalence partition: whitespace-only)', () => {
  expect(
    validation("   ", "John123", "test123", "test123", "61451406672", "abc@gmail.com")
  ).toBeTruthy();
});

test('Very long name should be treated as valid (equivalence partition: long input)', () => {
  const longName = "a".repeat(1000);
  expect(
    validation(longName, "John123", "test123", "test123", "61451406672", "abc@gmail.com")
  ).toBeTruthy();
});

test("email with one character username should be treated as valid", () => {  
  expect(
    validation("John", "John123", "test123", "test123", "61451406672", "a@gmail.com")
  ).toBeTruthy();
}); 
test("email starting with number should be treated as valid", () => {
  expect(
    validation("John", "John123", "test123", "test123", "61451406672", "123@gmail.com")
  ).toBeTruthy(); 
});
