// import { POST } from "@/app/api/user/route";


// describe("POST /api/login", () => {
//   it("returns 200 for valid login", async () => {
//     const req = new Request("http://localhost:3000/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: "test@example.com",
//         password: "123456",
//       }),
//     });

//     const res = await POST(req);
//     const data = await res.json();

//     expect(res.status).toBe(200);
//     expect(data).toEqual({
//       success: true,
//       message: "Login successful",
//     });
//   });

//   it("returns 401 for invalid login", async () => {
//     const req = new Request("http://localhost:3000/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: "wrong@example.com",
//         password: "wrongpass",
//       }),
//     });

//     const res = await POST(req);
//     const data = await res.json();

//     expect(res.status).toBe(401);
//     expect(data).toEqual({
//       success: false,
//       message: "Invalid credentials",
//     });
//   });
// });
import { POST } from "@/app/api/user/route";

const req = new Request("http://localhost:3000/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@example.com" }),
})as any;

const res = await POST(req);
const data = await res.json();
console.log(data);