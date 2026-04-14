
import { handlers } from "@/auth";// Referring to the auth.ts we just created
export const { GET, POST } = handlers;
// export async function GET() {
//   try {
//     const data = await db.select().from(users);
//     return NextResponse.json({
//       success: true,
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { success: false, message: "Error fetching users" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       email,      
//     } = body;

//     // ✅ Basic validation
//     if (!email) {
//       return NextResponse.json(
//         { success: false, message: "Email is required" },
//         { status: 400 }
//       );
//     }
//     // ✅ Insert into DB
//     const newUser = await db
//       .insert(users)
//       .values({
//         email,               
//         isActive: true,
//         createdAt: new Date(),
//       })
//       .returning();

//     return NextResponse.json({
//       success: true,
//       data: newUser,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Error creating user" },
//       { status: 500 }
//     );
//   }
// }


