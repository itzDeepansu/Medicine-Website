import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request) {
    const data = await request.json()
    const { name , email , password} = data
    const exist = await prisma.user.findUnique({
        where: {
          email,
        },
      });
    if(exist){
        return new NextResponse ("Email already exists",{status : 400})
    }
    if( !name  || !email || !password){
        return new NextResponse ("Empty fields",{status : 400})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await prisma.user.create({
        data : {
            name,
            email,
            hashedPassword
        }
    })
    // await prisma.medicine.createMany({
    //     data: [
    //       { 
    //         medicineID: 1,
    //         medicineName: 'Paracetamol',
    //         manufacturer: 'XYZ Pharmaceuticals',
    //         dosageStrength: '500 mg',
    //         priceUSD: 5.00,
    //         expiryDate: new Date("2024-06-30"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Paracetamol'
    //       },
    //       { 
    //         medicineID: 2,
    //         medicineName: 'Ibuprofen',
    //         manufacturer: 'ABC Meds',
    //         dosageStrength: '200 mg',
    //         priceUSD: 7.50,
    //         expiryDate: new Date("2024-09-15"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Ibuprofen'
    //       },
    //       { 
    //         medicineID: 3,
    //         medicineName: 'Amoxicillin',
    //         manufacturer: 'PharmaCorp',
    //         dosageStrength: '250 mg',
    //         priceUSD: 10.00,
    //         expiryDate: new Date("2024-07-20"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Amoxicillin'
    //       },
    //       { 
    //         medicineID: 4,
    //         medicineName: 'Omeprazole',
    //         manufacturer: 'MedCo',
    //         dosageStrength: '20 mg',
    //         priceUSD: 15.00,
    //         expiryDate: new Date("2024-08-10"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Omeprazole'
    //       },
    //       { 
    //         medicineID: 5,
    //         medicineName: 'Diphenhydramine',
    //         manufacturer: 'PharmaHealth',
    //         dosageStrength: '25 mg',
    //         priceUSD: 8.50,
    //         expiryDate: new Date("2024-05-25"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Diphenhydramine'
    //       },
    //       { 
    //         medicineID: 6,
    //         medicineName: 'Cetirizine',
    //         manufacturer: 'XYZ Pharmaceuticals',
    //         dosageStrength: '10 mg',
    //         priceUSD: 12.00,
    //         expiryDate: new Date("2024-07-05"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Cetirizine'
    //       },
    //       { 
    //         medicineID: 7,
    //         medicineName: 'Aspirin',
    //         manufacturer: 'ABC Meds',
    //         dosageStrength: '81 mg',
    //         priceUSD: 6.00,
    //         expiryDate: new Date("2024-09-30"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Aspirin'
    //       },
    //       { 
    //         medicineID: 8,
    //         medicineName: 'Loratadine',
    //         manufacturer: 'PharmaCorp',
    //         dosageStrength: '10 mg',
    //         priceUSD: 9.00,
    //         expiryDate: new Date("2024-06-15"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Loratadine'
    //       },
    //       { 
    //         medicineID: 9,
    //         medicineName: 'Ranitidine',
    //         manufacturer: 'MedCo',
    //         dosageStrength: '150 mg',
    //         priceUSD: 11.00,
    //         expiryDate: new Date("2024-08-20"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Ranitidine'
    //       },
    //       { 
    //         medicineID: 10,
    //         medicineName: 'Naproxen',
    //         manufacturer: 'PharmaHealth',
    //         dosageStrength: '220 mg',
    //         priceUSD: 14.00,
    //         expiryDate: new Date("2024-07-10"),
    //         imageURL: 'https://dummyimage.com/300x200/000/fff&text=Naproxen'
    //       }
    //     ]
    //   });
    console.log("data added successfully");
    return NextResponse.json(user)
}