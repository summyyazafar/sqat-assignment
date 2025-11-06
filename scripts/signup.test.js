/**
 * @jest-environment jsdom
 */

function validation(name, user, pass, confirmpass, mobileNumber, emails) {

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
beforeEach(() => {
  document.body.innerHTML = `
    <div id="Name"></div>
    <div id="username"></div>
    <div id="passwords"></div>
    <div id="confrmpass"></div>
    <div id="mobileno"></div>
    <div id="emailids"></div>
  `;
});
// Equavalence Partitioning Tests for Name Field
test("EP-Name-01: Empty name field", () => {
  const result = validation("", "testuser", "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(false);
  expect(document.getElementById("Name").innerHTML).toBe(" ** Please fill the Name field");
});

test("EP-Name-02: Valid string with length greater than or equal to one", () => {
  const result = validation("l", "testuser", "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(true);
});
// Boundary Value Analysis Tests for Name Field
test("BVA-Name-01: Name length of minimum value 1", () => {
  const result = validation("k", "testuser", "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(true);
});
test("BVA-Name-02: Name can have max length of 100 characters", () => {
  const longName = "A".repeat(100);
  const result = validation(longName, "testuser", "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(true);
});

// Equivalence Partitioning Tests for Email Field
test("EP-Email-01: Empty email field", () => {
  const result = validation("John Doe", "testuser", "password123", "password123", "01234567890", "");
  expect(result).toBe(false);
  expect(document.getElementById("emailids").innerHTML).toBe(" ** Please fill the email id field");
});

test("EP-Email-02: Missing '@' symbol", () => {
  const result = validation("John Doe", "testuser", "password123", "password123", "01234567890", "abcgmail.com");
  expect(result).toBe(false);
});
 // Boundary Value Analysis Tests for Email Field
test("BVA-Email-01: Valid email with minimum length", () => {
  const result = validation("John Doe", "testuser", "password123", "password123", "01234567890", "a@b.com");
  expect(result).toBe(true);
});

test("BVA-Email-02: Valid email with maximum reasonable length", () => {
  const longEmail = "a".repeat(64) + "@" + "b".repeat(63) + ".com"; // Total length 130
  const result = validation("John Doe", "testuser", "password123", "password123", "01234567890", longEmail);
  expect(result).toBe(true);
});
 // Equivalence Partitioning Tests for Username Field
test("EP-Username-01: Empty username field", () => {
  const result = validation("John Doe", "", "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(false);
});

test("EP-Username-02: Username contain only numbers", () => {
  const result = validation("John Doe", "1321", "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(false);
  expect(document.getElementById("username").innerHTML).toBe(" ** only characters are allowed");
});
// Boundary Value Analysis Tests for Username Field
test("BVA-Username-01: Username with minimum length 4", () => {
  const result = validation("John Doe", "user", "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(true);
});

test("BVA-Username-02: Username with maximum length 20", () => {
  const longUsername = "a".repeat(20);
  const result = validation("John Doe", longUsername, "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(true);
});
 // Equivalence Partitioning Tests for Password Field
test("EP-Password-01: Empty password field", () => {
  const result = validation("John Doe", "testuser", "", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(false);
});

test("EP-Password-02: Passwords do not match", () => {
  const result = validation("John Doe", "testuser", "password123", "password124", "01234567890", "abc@gmail.com");
  expect(result).toBe(false);
});
// Boundary Value Analysis Tests for Password Field
test("BVA-Password-01: Password with minimum length 6", () => {
  const result = validation("John Doe", "testuser", "passw1", "passw1", "01234567890", "abc@gmail.com");
  expect(result).toBe(true);
});

test("BVA-Password-02: Password with maximum length 20", () => {
  const longPassword = "a".repeat(20);
  const result = validation("John Doe", "testuser", longPassword, longPassword, "01234567890", "abc@gmail.com");
  expect(result).toBe(true);
});
 // Equivalence Partitioning Tests for Mobile Number Field
test("EP-Mobile-01: Empty mobile number field", () => {
  const result = validation("John Doe", "testuser", "password123", "password123", "", "abc@gmail.com");
  expect(result).toBe(false);
});

test("EP-Mobile-02: Mobile number contains characters", () => {
  const result = validation("John Doe", "testuser", "password123", "password123", "01234abc890", "abc@gmail.com");
  expect(result).toBe(false);
  expect(document.getElementById("mobileno").innerHTML).toBe(" ** user must write digits only not characters");
}); 
 // Boundary Value Analysis Tests for Mobile Number Field
test("BVA-Mobile-01: Mobile number with exactly 11 digits", () => {
  const result = validation("John Doe", "testuser", "password123", "password123", "01234567890", "abc@gmail.com");
  expect(result).toBe(true);
});

test("BVA-Mobile-02: Mobile number with less than 11 digits", () => {
  const result = validation("John Doe", "testuser", "password123", "password123", "0123456789", "abc@gmail.com");
  expect(result).toBe(false);
});