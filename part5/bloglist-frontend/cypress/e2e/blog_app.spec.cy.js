describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    // ...
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });
});

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // create here a user to backend
    const user = {
      name: "Gandalf",
      username: "Mithrandir",
      password: "amondul",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Mithrandir");
      cy.get("#password").type("amondul");
      cy.get("#login-button").click();
      cy.contains("Gandalf is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("Bartholomew");
      cy.get("#password").type("amondul");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
    });

    it("red error message when login fails", function () {
      cy.get("#username").type("Bartholomew");
      cy.get("#password").type("amondul");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });
});

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Gandalf",
      username: "Mithrandir",
      password: "amondul",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });
  // ...

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Mithrandir", password: "amondul" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#titleinput").type("Fellowship of the Ring");
      cy.get("#authorinput").type("Tolkien");
      cy.get("#urlinput").type("analog.com");
      cy.get("#createbutton").click();

      cy.contains("Fellowship of the Ring");
      cy.contains("view").click();
      cy.contains("hide").click();
    });

    it("A created blog can be liked", function () {
      cy.createBlog({
        title: "Fellowship of the Ring",
        author: "Tolkien",
        url: "analog.com",
      });
      cy.contains("likes 0");
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("likes 1");
    });

    it("A created blog can be deleted", function () {
      cy.createBlog({
        title: "Fellowship of the Ring",
        author: "Tolkien",
        url: "analog.com",
      });
      cy.contains("view").click();
      cy.contains("remove").click();
    });
  });
});
