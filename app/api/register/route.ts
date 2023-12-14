import bcript from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const {
        email,
        name, 
        password
    } = body;
    const hashedPassword = await bcript.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}