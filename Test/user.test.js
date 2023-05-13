data = {
  fname: "Abc",
  lname: "Abdullah",
  email: "anas@gmail.com",
  password: "wefwehfieffew",
};

test("user data", async () => {
  //   const { fname, lname, email} = req.body;
  const res = await fetch("http://localhost:5000/user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
  console.log(res);
  expect(res.fname).toBe("Anas");
  expect(res.lname).toBe("Abdullah");
  expect(res.email).toBe("anas@gmail.com");
  expect(res.password).toBe("wefwehfieffew");
});
